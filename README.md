
# CRUD API - NodeJS

Um CRUD simples para uma petshop, com cadastros de clientes, pets,serviços e agendamentos.


## Documentação

Todas as rotas podem fazer GET, DELETE e UPDATE.

### Pets


```
fetch('https://crud-pet.herokuapp.com/pets')
.then(res => res.json())
.then(console.log)
```

#### Resposta:

<div>
<img src="https://user-images.githubusercontent.com/88148849/185434432-c230146b-6495-4098-8045-e72426694e6a.png"/>
</div>

### Clientes


```
fetch('https://crud-pet.herokuapp.com/clients')
.then(res => res.json())
.then(console.log)
```
<div>
<img src="https://user-images.githubusercontent.com/88148849/185435336-e4401ae0-f44e-4b98-be8f-17f928cf2f6a.png"/>
</div>

### Serviços


```
fetch('https://crud-pet.herokuapp.com/services')
.then(res => res.json())
.then(console.log)
```
<div>
<img src="https://user-images.githubusercontent.com/88148849/185435755-a72a9a32-6e36-4655-beb1-d5d86e0c3dac.png"/>
</div>

### Agendamentos
* Os agendamentos podem ser retornados por paginas.

```
fetch('https://crud-pet.herokuapp.com/scheduling')
.then(res => res.json())
.then(console.log)
```
<div>
<img src="https://user-images.githubusercontent.com/88148849/185436049-ef3e2073-8b99-435a-8b7e-7f6cf28b15b8.png"/>
</div>

### Status para Dashboard


```
fetch('https://crud-pet.herokuapp.com/stat')
.then(res => res.json())
.then(console.log)
```
<div>
<img src="https://user-images.githubusercontent.com/88148849/185436356-79996ec6-4aea-4c81-ad20-77240b330baa.png"/>
</div>

## Stack utilizada


**Back-end:** Node, Express, Postgres, MongoDB, Knex e Cosign.

