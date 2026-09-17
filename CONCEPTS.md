# Module X – Module's Name

> 🚨 **Replace `X` with your module number and `Module's Name` with the actual module name.**

## 🎯 Purpose

> List **`three (3) challenging concepts`** applied in this project. List each concept only once, even if used in multiple places.

## 📝 How to Use the CONCEPTS.md Log

> 1. Write the **`🔤 Name`** of the concept you found challenging.
> 2. Describe its **`🎯 Purpose`** within the project.
> 3. Explain in your own words **`❓ Why`** it was challenging
> 4. If applicable, indicate **`📍 Where`** it was used in your project (file name and line number).

---

---

## ✏️ Concept - 01

**🔤 Name:**
supabase api calls v.s. traditional fetch 
...

**🎯 Purpose:**
in this project we use supabase for our project db which is a baas based on postgresql. when making posts requests via the contact form we write a query builder call using methods like .from() and .insert() rather than actually constructing an http request with a try/catch block. There are a few reasons to make a request this way but I think the primary reason is that this matches Postgres/PostgREST's own error semantics. Initally seing the const holding the request as object destructuring caused some confusion but requests done in this way always return an object structured like { data, error } so we capture the error message from the response and decide what to do with the data based on what the error key returns.
...

**❓ Why it was challenging:**
Initally seing the const holding the request as object destructuring caused some confusion but requests done in this way always return an object structured like { data, error } so we capture the error message from the response and decide what to do with the data based on what the error key returns.
...

**📍 Where (file & line):**
BackOffice.jsx line 39 
...

---

## ✏️ Concept - 02

**🔤 Name:**
which API URL's to use
...

**🎯 Purpose:**
in this porject we use two keys/URL's to conncect to supabase, SUPABASE_URL which is the base URL of the projects API, a general pointer to our api.Wea also use SUPABASE_PUBLISHABLE_KEY which Identifies that the request is coming from a public front end, every row still goes through RLS policies.
...

**❓ Why it was challenging:**
this was challenging because the supabase dashboard has multiple API keys with different names and it wasn't clear which ones needed to get used and I ended up using the wrong api keys. I had claude create this table to explain the diferences between the keys 

| Key | Purpose | Where it's used | Can it be public? |
|---|---|---|---|
| `SUPABASE_URL` | The base URL of your project's API (`https://xxxx.supabase.co`) | Anywhere — client or server | Yes, always |
| `anon` / `PUBLISHABLE_KEY` | Identifies the request as coming from your app's public frontend. Every request still goes through **Row Level Security (RLS)** policies — this key alone grants no special access. | Browser/client code | Yes — designed to be embedded in shipped frontend code |
| `service_role` / `SECRET_KEY` | Bypasses RLS entirely — full admin access to the database, no policy checks. | Trusted server-only code (a backend, an edge function, a CI script) — **never** in browser/frontend bundles | **No** — if this leaks, anyone can read/write/delete any row in any table |
| `JWKS_URL` | Publishes the public keys used to verify JWTs (the access tokens issued by `signInWithPassword`, etc.) so any service can independently verify a Supabase-issued token is legitimate, without calling Supabase's API each time. | Backend/server-side token verification | Yes, it's public by design |
...

**📍 Where (file & line):**
.env.example
...

---

## ✏️ Concept - 03

**🔤 Name:**
deploy.yml
...

**🎯 Purpose:**
This page is available via github pages, we created a deploy.yml file which is our CI/CD pipeline which automates the deployement of changes to the live page as they get pushed to main. Vite is the compiler and deploy.yml decides trigger conditions, provides secrets/environment, calls Vite, then ships the output somewhere. 
...

**❓ Why it was challenging:**
I've never really seen a yml file and in the last module didn't really understand the concept of a CI/CD pipeline (I'm still not sure I do) after reading through the file and seeing how CI/CD automation is used in practice, its easier to understand how this process is useful. 
...

**📍 Where (file & line):**
deploy.yml
...

---
