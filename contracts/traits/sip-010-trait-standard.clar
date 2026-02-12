;; sip-010-trait-standard.clar
;; Standard SIP-010 Trait Definition for Fungible Tokens

(define-trait sip-010-trait
  (
    ;; Transfer from the caller to a new principal
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))

    ;; Human readable name of the token
    (get-name () (response (string-ascii 32) uint))

    ;; Human readable symbol of the token
    (get-symbol () (response (string-ascii 32) uint))

    ;; the number of decimals used
    (get-decimals () (response uint uint))

    ;; the current total supply (which does not need to be a constant)
    (get-total-supply () (response uint uint))

    ;; the current balance of a principal
    (get-balance (principal) (response uint uint))

    ;; method to get the token URI
    (get-token-uri () (response (optional (string-utf8 256)) uint))
  )
)

;; End of trait definition
