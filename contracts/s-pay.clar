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

;; --- Data Variables ---

;; The primary administrator address that can update protocol settings
(define-data-var contract-owner principal tx-sender)

;; A safety switch to halt sensitive operations in case of emergency
(define-data-var is-paused bool false)

;; The treasury address where platform fees are directed
(define-data-var fee-receiver principal tx-sender)

;; Current platform fee in basis points (e.g., 200 = 2%)
(define-data-var fee-percentage uint u200)

;; Scaling counter for user registrations to ensure unique indexing
(define-data-var user-nonce uint u0)

;; Scaling counter for merchant registrations and profile tracking
(define-data-var merchant-nonce uint u0)

;; Total transaction volume processed by the protocol in micro-STX
(define-data-var total-volume uint u0)

;; Total platform fees collected since deployment
(define-data-var total-fees-collected uint u0)

;; Global switch for merchant verification requirements
(define-data-var require-merchant-verification bool true)

;; Maximum allowed transaction volume per single payment
(define-data-var max-payment-amount (optional uint) none)

;; --- Data Maps ---

;; User Records - maps principal to a unique user-id and registration data
(define-map Users
    principal
    {
        user-id: uint,
        username: (string-ascii 24),
        status: (string-ascii 12), ;; "active", "suspended"
        registered-at: uint,
        total-spent: uint,
        total-received: uint,
        is-merchant: bool
    }
)

;; Username Lookup - maps username to principal to ensure uniqueness
(define-map Usernames
    (string-ascii 24)
    principal
)

;; --- Public Functions ---

;; @desc Register a new user in the protocol
;; @param username (string-ascii 24) - A unique display name for the user
(define-public (register-user (username (string-ascii 24)))
    (let (
        (new-id (+ (var-get user-nonce) u1))
    )
        ;; Check if contract is paused
        (asserts! (not (var-get is-paused)) ERR-CONTRACT-PAUSED)

        ;; Check if user is already registered
        (asserts! (is-none (map-get? Users tx-sender)) ERR-ALREADY-REGISTERED)

        ;; Check if username is already taken
        (asserts! (is-none (map-get? Usernames username)) ERR-ALREADY-REGISTERED)

        ;; Optional: Handle registration fee if enabled
        (if (> REGISTRATION-FEE-STX u0)
            (try! (stx-transfer? REGISTRATION-FEE-STX tx-sender (var-get fee-receiver)))
            true
        )

        ;; Store user record
        (map-set Users tx-sender {
            user-id: new-id,
            username: username,
            status: "active",
            registered-at: stacks-block-height,
            total-spent: u0,
            total-received: u0,
            is-merchant: false
        })

        ;; Merchant Records - maps principal to their business details
(define-map Merchants
    principal
    {
        merchant-id: uint,
        business-name: (string-ascii 64),
        description: (string-ascii 256),
        website: (string-ascii 128),
        status: (string-ascii 12), ;; "pending", "verified", "suspended"
        tier: (string-ascii 12), ;; "basic", "premium", "enterprise"
        total-revenue: uint,
        dispute-count: uint,
        metadata-hash: (buff 32)
    }
)

;; --- Public Functions ---

;; @desc Register as a merchant to receive professional payments
;; @param business-name (string-ascii 64) - The legal or brand name
;; @param website (string-ascii 128) - Official business website
(define-public (register-merchant (business-name (string-ascii 64)) (website (string-ascii 128)))
    (let (
        (user (unwrap! (map-get? Users tx-sender) ERR-USER-NOT-FOUND))
        (new-id (+ (var-get merchant-nonce) u1))
    )
        ;; Check if contract is paused
        (asserts! (not (var-get is-paused)) ERR-CONTRACT-PAUSED)

        ;; Check if already a merchant
        (asserts! (is-none (map-get? Merchants tx-sender)) ERR-ALREADY-REGISTERED)

        ;; Basic verification stake if required
        (if (var-get require-merchant-verification)
            (try! (stx-transfer? MERCHANT-VERIFICATION-STAKE tx-sender (as-contract tx-sender)))
            true
        )

        ;; Store merchant profile
        (map-set Merchants tx-sender {
            merchant-id: new-id,
            business-name: business-name,
            description: "",
            website: website,
            status: (if (var-get require-merchant-verification) "pending" "verified"),
            tier: "basic",
            total-revenue: u0,
            dispute-count: u0,
            metadata-hash: 0x0000000000000000000000000000000000000000000000000000000000000000
        })

        ;; Update user record to reflect merchant status
        (map-set Users tx-sender (merge user { is-merchant: true }))

        ;; Increment merchant nonce
        (var-set merchant-nonce new-id)

        ;; Emit merchant registration event
        (print {
            event: "merchant-registered",
            merchant: tx-sender,
            merchant-id: new-id,
            business-name: business-name
        })

        (ok new-id)
    )
)

;; read only functions
;;

;; private functions
;;

