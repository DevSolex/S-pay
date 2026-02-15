;; escrow-manager.clar
;; Basic escrow functionality for secure payments

(define-map escrows
  { escrow-id: uint }
  {
    payer: principal,
    payee: principal,
    amount: uint,
    status: (string-ascii 20), ;; "PENDING", "RELEASED", "REFUNDED", "DISPUTED"
    created-at: uint,
    released-at: (optional uint),
    refunded-at: (optional uint),
    memo: (optional (string-utf8 256))
  }
)

(define-data-var next-escrow-id uint u1)
(define-data-var total-escrows-created uint u0)
(define-data-var total-amount-escrowed uint u0)
(define-data-var total-amount-released uint u0)
(define-data-var total-amount-refunded uint u0)

;; Events
(define-constant event-escrow-created "escrow-created")
(define-constant event-escrow-released "escrow-released")
(define-constant event-escrow-refunded "escrow-refunded")
(define-constant event-escrow-disputed "escrow-disputed")
(define-constant event-escrow-cancelled "escrow-cancelled")
(define-constant event-escrow-expired "escrow-expired")

;; Error codes
(define-constant err-not-found u404)
(define-constant err-not-payer u401)
(define-constant err-not-payee u402)
(define-constant err-invalid-status u403)
(define-constant err-already-processed u405)
(define-constant err-transfer-failed u406)
(define-constant err-invalid-amount u407)
(define-constant err-escrow-expired u408)

;; Timeout constants (in blocks)
(define-constant DEFAULT_TIMEOUT u144) ;; ~24 hours (assuming 10-min blocks)
(define-constant DISPUTE_TIMEOUT u4320) ;; ~30 days

;; Track escrow activity per user
(define-map user-escrows
  { user: principal }
  {
    created: uint,
    received: uint,
    total-created-amount: uint,
    total-received-amount: uint
  }
)

;; Track escrow history for analytics
(define-map escrow-history
  { escrow-id: uint }
  {
    events: (list 10 { event: (string-ascii 20), at: uint, by: principal })
  }
)

(define-read-only (get-next-escrow-id)
  (var-get next-escrow-id)
)

(define-read-only (get-total-stats)
  {
    total-escrows: (var-get total-escrows-created),
    total-escrowed: (var-get total-amount-escrowed),
    total-released: (var-get total-amount-released),
    total-refunded: (var-get total-amount-refunded),
    current-balance: (stx-get-balance (as-contract tx-sender))
  }
)

(define-read-only (get-user-stats (user principal))
  (default-to 
    { created: u0, received: u0, total-created-amount: u0, total-received-amount: u0 }
    (map-get? user-escrows { user: user })
  )
)

(define-private (update-user-stats (user principal) (is-payer bool) (amount uint))
  (let
    ((stats (default-to 
      { created: u0, received: u0, total-created-amount: u0, total-received-amount: u0 }
      (map-get? user-escrows { user: user })
    )))
    (if is-payer
      (map-set user-escrows
        { user: user }
        {
          created: (+ (get created stats) u1),
          received: (get received stats),
          total-created-amount: (+ (get total-created-amount stats) amount),
          total-received-amount: (get total-received-amount stats)
        }
      )
      (map-set user-escrows
        { user: user }
        {
          created: (get created stats),
          received: (+ (get received stats) u1),
          total-created-amount: (get total-created-amount stats),
          total-received-amount: (+ (get total-received-amount stats) amount)
        }
      )
    )
  )
)

(define-private (add-to-history (id uint) (event-name (string-ascii 20)) (by principal))
  (let
    ((history (default-to 
      { events: (list) }
      (map-get? escrow-history { escrow-id: id })
    )))
    (map-set escrow-history
      { escrow-id: id }
      { 
        events: (unwrap-panic (as-max-len? 
          (append (get events history) { event: event-name, at: stacks-block-height, by: by }) 
          u10
        ))
      }
    )
  )
)

(define-public (create-escrow (payee principal) (amount uint) (memo (optional (string-utf8 256))))
  (let
    (
      (id (var-get next-escrow-id))
    )
    (begin
      (asserts! (> amount u0) (err err-invalid-amount))
      (asserts! (not (is-eq payee tx-sender)) (err err-invalid-amount))
      
      (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
      
      (map-insert escrows
        { escrow-id: id }
        {
          payer: tx-sender,
          payee: payee,
          amount: amount,
          status: "PENDING",
          created-at: stacks-block-height,
          released-at: none,
          refunded-at: none,
          memo: memo
        }
      )
      
      (var-set next-escrow-id (+ id u1))
      (var-set total-escrows-created (+ (var-get total-escrows-created) u1))
      (var-set total-amount-escrowed (+ (var-get total-amount-escrowed) amount))
      
      ;; Update user stats
      (update-user-stats tx-sender true amount)
      
      ;; Add to history
      (add-to-history id "CREATED" tx-sender)
      
      ;; Emit escrow created event
      (print {
        event: event-escrow-created,
        escrow-id: id,
        payer: tx-sender,
        payee: payee,
        amount: amount,
        memo: memo,
        stacks-block-height: stacks-block-height,
        contract-balance: (stx-get-balance (as-contract tx-sender))
      })
      
      (ok id)
    )
  )
)

(define-public (release-escrow (id uint))
  (match (map-get? escrows { escrow-id: id })
    some-escrow
      (begin
        (asserts! (is-eq (get payer some-escrow) tx-sender) (err err-not-payer))
        (asserts! (is-eq (get status some-escrow) "PENDING") (err err-invalid-status))
        
        (let
          (
            (amount (get amount some-escrow))
            (payee (get payee some-escrow))
          )
          
          (try! (as-contract (stx-transfer? amount tx-sender payee)))
          
          (map-set escrows
            { escrow-id: id }
            (merge some-escrow { 
              status: "RELEASED", 
              released-at: (some stacks-block-height)
            })
          )
          
          (var-set total-amount-released (+ (var-get total-amount-released) amount))
          
          ;; Update user stats for payee
          (update-user-stats payee false amount)
          
          ;; Add to history
          (add-to-history id "RELEASED" tx-sender)
          
          ;; Emit escrow released event
          (print {
            event: event-escrow-released,
            escrow-id: id,
            payer: (get payer some-escrow),
            payee: payee,
            amount: amount,
            stacks-block-height: stacks-block-height,
            released-by: tx-sender,
            contract-balance: (stx-get-balance (as-contract tx-sender))
          })
          
          (ok true)
        )
      )
    (err err-not-found)
  )
)

(define-public (refund-escrow (id uint))
  (match (map-get? escrows { escrow-id: id })
    some-escrow
      (begin
        (asserts! (is-eq (get payer some-escrow) tx-sender) (err err-not-payer))
        (asserts! (is-eq (get status some-escrow) "PENDING") (err err-invalid-status))
        
        (let
          (
            (amount (get amount some-escrow))
            (payer (get payer some-escrow))
          )
          
          (try! (as-contract (stx-transfer? amount tx-sender payer)))
          
          (map-set escrows
            { escrow-id: id }
            (merge some-escrow { 
              status: "REFUNDED", 
              refunded-at: (some stacks-block-height)
            })
          )
          
          (var-set total-amount-refunded (+ (var-get total-amount-refunded) amount))
          
          ;; Add to history
          (add-to-history id "REFUNDED" tx-sender)
          
          ;; Emit escrow refunded event
          (print {
            event: event-escrow-refunded,
            escrow-id: id,
            payer: payer,
            payee: (get payee some-escrow),
            amount: amount,
            stacks-block-height: stacks-block-height,
            refunded-by: tx-sender
          })
          
          (ok true)
        )
      )
    (err err-not-found)
  )
)

(define-public (raise-dispute (id uint))
  (match (map-get? escrows { escrow-id: id })
    some-escrow
      (begin
        (asserts! (or (is-eq (get payer some-escrow) tx-sender) (is-eq (get payee some-escrow) tx-sender)) (err err-not-payer))
        (asserts! (is-eq (get status some-escrow) "PENDING") (err err-invalid-status))
        
        (map-set escrows
          { escrow-id: id }
          (merge some-escrow { status: "DISPUTED" })
        )
        
        ;; Add to history
        (add-to-history id "DISPUTED" tx-sender)
        
        ;; Emit dispute raised event
        (print {
          event: event-escrow-disputed,
          escrow-id: id,
          raised-by: tx-sender,
          payer: (get payer some-escrow),
          payee: (get payee some-escrow),
          amount: (get amount some-escrow),
          stacks-block-height: stacks-block-height
        })
        
        (ok true)
      )
    (err err-not-found)
  )
)

(define-public (cancel-escrow (id uint))
  (match (map-get? escrows { escrow-id: id })
    some-escrow
      (begin
        (asserts! (is-eq (get payer some-escrow) tx-sender) (err err-not-payer))
        (asserts! (is-eq (get status some-escrow) "PENDING") (err err-invalid-status))
        
        ;; Check if within cancellation window (first 10 blocks)
        (asserts! (<= (- stacks-block-height (get created-at some-escrow)) u10) (err err-escrow-expired))
        
        (let
          (
            (amount (get amount some-escrow))
          )
          
          (try! (as-contract (stx-transfer? amount tx-sender tx-sender)))
          
          (map-set escrows
            { escrow-id: id }
            (merge some-escrow { status: "REFUNDED" })
          )
          
          (var-set total-amount-refunded (+ (var-get total-amount-refunded) amount))
          
          ;; Add to history
          (add-to-history id "CANCELLED" tx-sender)
          
          ;; Emit cancelled event
          (print {
            event: event-escrow-cancelled,
            escrow-id: id,
            payer: (get payer some-escrow),
            amount: amount,
            stacks-block-height: stacks-block-height
          })
          
          (ok true)
        )
      )
    (err err-not-found)
  )
)

;; Read-only functions
(define-read-only (get-escrow (id uint))
  (map-get? escrows { escrow-id: id })
)

(define-read-only (get-escrow-history (id uint))
  (default-to { events: (list) } (map-get? escrow-history { escrow-id: id }))
)

(define-read-only (get-escrows-by-payer (payer principal) (offset uint) (limit uint))
  ;; Note: Would need iteration - placeholder for frontend
  (ok { 
    message: "Use get-escrow with specific IDs",
    payer: payer,
    offset: offset,
    limit: limit 
  })
)

(define-read-only (get-escrows-by-payee (payee principal) (offset uint) (limit uint))
  ;; Note: Would need iteration - placeholder for frontend
  (ok { 
    message: "Use get-escrow with specific IDs",
    payee: payee,
    offset: offset,
    limit: limit 
  })
)
