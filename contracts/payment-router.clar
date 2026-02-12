;; payment-router.clar
;; Contract to route payments between payers and merchants with optional fees

(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-INVALID-AMOUNT (err u101))

(define-data-var protocol-fee-percent uint u10) ;; 1.0%

(define-public (route-payment (amount uint) (recipient principal))
  (let
    (
      (fee (/ (* amount (var-get protocol-fee-percent)) u1000))
      (net-amount (- amount fee))
    )
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    
    ;; Transfer fee to contract owner (simplified)
    (try! (stx-transfer? fee tx-sender (as-contract tx-sender)))
    
    ;; Transfer net amount to recipient
    (try! (stx-transfer? net-amount tx-sender recipient))
    
    (ok true)
  )
)

(define-public (update-fee (new-fee uint))
  (begin
    ;; In a real contract, we would check for admin privileges here
    (var-set protocol-fee-percent new-fee)
    (ok true)
  )
)

(define-read-only (get-current-fee)
  (ok (var-get protocol-fee-percent))
)
