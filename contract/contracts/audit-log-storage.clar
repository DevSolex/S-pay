;; audit-log-storage.clar
;; Contract to store audit logs on-chain for critical events

(define-map audit-logs
  { log-id: uint }
  {
    action: (string-ascii 32),
    actor: principal,
    timestamp: uint,
    details: (string-utf8 256)
  }
)

(define-data-var next-log-id uint u1)

(define-public (log-action (action (string-ascii 32)) (details (string-utf8 256)))
  (let
    (
      (id (var-get next-log-id))
    )
    (map-insert audit-logs
      { log-id: id }
      {
        action: action,
        actor: tx-sender,
        timestamp: block-height,
        details: details
      }
    )
    (var-set next-log-id (+ id u1))
    (ok id)
  )
)

(define-read-only (get-log (id uint))
  (map-get? audit-logs { log-id: id })
)

(define-read-only (get-latest-log-id)
  (ok (var-get next-log-id))
)
