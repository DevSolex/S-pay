;; s-pay-token.clar
;; SIP-010 compliant fungible token for S-pay protocol

(impl-trait .sip-010-trait)

(define-fungible-token s-pay-token)

(define-constant contract-owner tx-sender)

(define-constant ERR-NOT-OWNER (err u100))
(define-constant ERR-NOT-AUTHORIZED (err u101))

;; SIP-010 Functions

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (asserts! (or (is-eq tx-sender sender) (is-eq contract-caller sender)) ERR-NOT-AUTHORIZED)
        (try! (ft-transfer? s-pay-token amount sender recipient))
        (match memo to-print (print to-print) 0x)
        (ok true)
    )
)

(define-read-only (get-name)
    (ok "S-pay Token")
)

(define-read-only (get-symbol)
    (ok "SPAY")
)

(define-read-only (get-decimals)
    (ok u6)
)

(define-read-only (get-balance (who principal))
    (ok (ft-get-balance s-pay-token who))
)

(define-read-only (get-total-supply)
    (ok (ft-get-total-supply s-pay-token))
)

(define-read-only (get-token-uri)
    (ok (some u"https://s-pay.io/token-metadata.json"))
)

;; Minting function for testing
(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) ERR-NOT-OWNER)
        (ft-mint? s-pay-token amount recipient)
    )
)
