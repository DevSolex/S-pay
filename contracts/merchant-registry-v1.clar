;; merchant-registry-v1.clar
;; Contract to manage merchant identities and payment destinations

(define-map merchants
  { merchant-id: uint }
  {
    name: (string-ascii 64),
    wallet-address: principal,
    active: bool,
    created-at: uint
  }
)

(define-data-var next-merchant-id uint u1)

(define-public (register-merchant (name (string-ascii 64)) (wallet principal))
  (let
    (
      (id (var-get next-merchant-id))
    )
    (map-insert merchants
      { merchant-id: id }
      {
        name: name,
        wallet-address: wallet,
        active: true,
        created-at: block-height
      }
    )
    (var-set next-merchant-id (+ id u1))
    (ok id)
  )
)

(define-read-only (get-merchant (id uint))
  (map-get? merchants { merchant-id: id })
)

(define-public (update-merchant-status (id uint) (active bool))
  (match (map-get? merchants { merchant-id: id })
    merchant (begin
      (map-set merchants
        { merchant-id: id }
        (merge merchant { active: active })
      )
      (ok true)
    )
    (err u404)
  )
)
