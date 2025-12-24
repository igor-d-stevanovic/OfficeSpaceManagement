# OfficeSpaceManagement

Struktura projekta:

- frontend/ – React aplikacija
- backend/ – Node.js + Express aplikacija

Ovaj repozitorijum koristi odvojene foldere za frontend i backend radi lakše organizacije i razvoja.

---

## Backend REST API primeri

Pokretanje backend servera:

```bash
node backend/index.js
```

Pokretanje seed skripte za test podatke:

```bash
node backend/seed.js
```

Primeri API poziva (koristeći curl):

**Lokacije**

```bash
# Svi
curl http://localhost:3001/api/locations
# Jedan
curl http://localhost:3001/api/locations/1
# Kreiraj
curl -X POST -H "Content-Type: application/json" -d '{"name":"Novi Beograd"}' http://localhost:3001/api/locations
```

**Kancelarije**

```bash
curl http://localhost:3001/api/offices
```

**Stolovi**

```bash
curl http://localhost:3001/api/desks
```

**Stolice**

```bash
curl http://localhost:3001/api/chairs
```

**Korisnici**

```bash
curl http://localhost:3001/api/users
```

**Rezervacije**

```bash
curl http://localhost:3001/api/reservations
```
