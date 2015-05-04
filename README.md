# cpf generator
Pequeno script para gerar números de CPF.

## Como usar
Baixe o arquivo `cpf.js` e no Terminal dê permissão de execução para o arquivo:

```
$ chmod +x cpf.js
```

Em seguida, por conveniencia, mova o arquivo para um local que esteja dentro do seu `PATH`.

```
$ mv cpf.js /usr/local/bin/cpf
```

Pronto! Agora basta digitar `cpf`, sem a extensão mesmo, em qualquer lugar e um novo número de CPF será copiado para a sua área de transferência.

## Gerar dígitos verificadores

Você pode gerar um CPF válido a partir de um número inventado, basta passar uma sequência de nove digitos para o comando `cpf`.

```
$ cpf 111222333
```

O resultado do comando anterior será o número `111222333-96`.

## Requisitos

O node.js deverá estar instalado no seu sistema.
