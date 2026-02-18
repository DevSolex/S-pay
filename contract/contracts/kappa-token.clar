;; kappa-token.clar
(impl-trait .sip-010-trait.sip-010-trait)
(define-fungible-token kappa-token)
(define-constant contract-owner tx-sender)
(define-constant ERR-NOT-OWNER (err u100))
(define-constant ERR-NOT-AUTHORIZED (err u101))

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (asserts! (or (is-eq tx-sender sender) (is-eq contract-caller sender)) ERR-NOT-AUTHORIZED)
        (try! (ft-transfer? kappa-token amount sender recipient))
        (match memo to-print (print to-print) 0x)
        (ok true)
    )
)

(define-read-only (get-name) (ok "KAPPA Token"))
(define-read-only (get-symbol) (ok "KAPPA"))
(define-read-only (get-decimals) (ok u6))
(define-read-only (get-balance (who principal)) (ok (ft-get-balance kappa-token who)))
(define-read-only (get-total-supply) (ok (ft-get-supply kappa-token)))
(define-read-only (get-token-uri) (ok none))

(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) ERR-NOT-OWNER)
        (ft-mint? kappa-token amount recipient)
    )
)