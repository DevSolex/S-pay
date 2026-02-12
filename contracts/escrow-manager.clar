;; escrow-manager.clar
;; Basic escrow functionality for secure payments

(define-map escrows
  { escrow-id: uint }
  {
    payer: principal,
    payee: principal,
    amount: uint,
    status: (string-ascii 20), ;; "PENDING", "RELEASED", "REFUNDED"
    created-at: uint
  }
)

(define-data-var next-escrow-id uint u1)

(define-public (create-escrow (payee principal) (amount uint))
  (let
    (
      (id (var-get next-escrow-id))
    )
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (map-insert escrows
      { escrow-id: id }
      {
        payer: tx-sender,
        payee: payee,
        amount: amount,
        status: "PENDING",
        created-at: block-height
      }
    )
    (var-set next-escrow-id (+ id u1))
    (ok id)
  )
)

(define-public (release-escrow (id uint))
  (match (map-get? escrows { escrow-id: id })
    escrow (begin
      (asserts! (is-eq (get payer escrow) tx-sender) (err u401))
      (asserts! (is-eq (get status escrow) "PENDING") (err u402))
      
      (try! (as-contract (stx-transfer? (get amount escrow) tx-sender (get payee escrow))))
      
      (map-set escrows
        { escrow-id: id }
        (merge escrow { status: "RELEASED" })
      )
      (ok true)
    )
    (err u404)
  )
)
