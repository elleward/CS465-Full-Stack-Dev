# Postman RBAC verification

## Prerequisites

1. Set `JWT_SECRET` and start the API with `npm start`.
2. Ensure one database user has `role: "admin"` and another has `role: "user"`.
3. Log in as each user with `POST /api/login` and save the returned tokens as the Postman environment variables `adminToken` and `userToken`.

## Requests

Use `Authorization: Bearer {{adminToken}}` to verify that these requests reach the trip controllers:

- `POST /api/trips` returns `201` for a valid trip body.
- `PUT /api/trips/:tripCode` returns `200` for an existing trip.
- `DELETE /api/trips/:tripCode` returns `204` for an existing trip.

Repeat each request with `Authorization: Bearer {{userToken}}`. Each must return `403` with:

```json
{ "message": "Admin access required" }
```

Repeat each request without the `Authorization` header. Each must return `401` with:

```json
{ "message": "Authentication required" }
```

Public `GET /api/trips` and `GET /api/trips/:tripCode` requests should remain accessible.
