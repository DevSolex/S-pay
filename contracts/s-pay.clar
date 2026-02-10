;; title: s-pay
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;;

;; Error Constants
(define-constant ERR-UNAUTHORIZED (err u100))
(define-constant ERR-NOT-OWNER (err u101))
(define-constant ERR-ALREADY-REGISTERED (err u102))
(define-constant ERR-USER-NOT-FOUND (err u103))
(define-constant ERR-MERCHANT-NOT-FOUND (err u104))
(define-constant ERR-INVALID-AMOUNT (err u105))
(define-constant ERR-INSUFFICIENT-FUNDS (err u106))
(define-constant ERR-PAYMENT-EXPIRED (err u107))
(define-constant ERR-ALREADY-PAID (err u108))
(define-constant ERR-INVALID-STATUS (err u109))
(define-constant ERR-CONTRACT-PAUSED (err u110))
(define-constant ERR-INVALID-FEE (err u111))
(define-constant ERR-LIMIT-EXCEEDED (err u112))
(define-constant ERR-INVALID-PRINCIPAL (err u113))
(define-constant ERR-SUBSCRIPTION-EXPIRED (err u114))
(define-constant ERR-PLAN-NOT-FOUND (err u115))
(define-constant ERR-NOT-ALLOWED (err u116))

;; Configuration Constants
(define-constant BP-PERCENT u10000) ;; Basis points (100% = 10000)
(define-constant MAX-FEE-PERCENT u500) ;; Max fee 5% (500 basis points)
(define-constant MIN-PAYMENT-STX u1000000) ;; 1 STX minimum for logic-heavy payments
(define-constant DISPUTE-WINDOW-BLOCKS u144) ;; ~24 hours
(define-constant REGISTRATION-FEE-STX u5000000) ;; 5 STX onboarding fee
(define-constant MERCHANT-VERIFICATION-STAKE u50000000) ;; 50 STX stake for high-tier merchants

;; Operational Variables
(define-constant CONTRACT-VERSION "1.0.0")
(define-constant PLATFORM-TAG "SPAY-PROTO")

;; data vars
;;

;; data maps
;;

;; public functions
;;

;; read only functions
;;

;; private functions
;;

