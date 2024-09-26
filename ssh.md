# configura ssh no windows sem docker 

```sh
# 1 - cria a chave ssh
ssh-keygen -t rsa -b 4096 -C "klawdyo@gmail.com"
# 2 - [enter 3 vezes para não botar senha]

# acessa o diretório com as chaves ssh relativo ao usuário do windows
cd /.ssh
# 3 - Copia o conteúdo do arquivo id_rsa.pub e cola no controle de chaves ssh do github
# 4 - Testa se a conexão com o github consegue acontecer após os passos acima
ssh -T git@github.com
# [Ele vai mostrar um fingerprint que deve ser copiado e colado quando o terminal solicitar.]
# Are you sure you want to continue connecting (yes/no/[fingerprint])?
# Após isso a chave será configurada para ser usada com o github. Teste novamente a conexão para ver se está ok. Deverá exibir:
# Hi klawdyo! You've successfully authenticated, but GitHub does not provide shell access.

```

- 2 
