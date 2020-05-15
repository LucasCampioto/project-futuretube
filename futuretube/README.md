# FutureTube

## Stack
Esse é a parte do frontend de um projeto fullstack que foi feito utilizando ReactJS, HTML, e CSS
E como gerenciador de pacotes do NodeJS o npm. A divisão de arquivos está
separada em quatro setores. Os 'components' que seria meu header e meu componente 
de card de um video. E possui alguns containers. Na parte de usuário temos, login, signup e
change password. Depois temos o resto da intereção do site que seria, feed, sendvideo, editvideo.
para controlar as interações que o usuário tem com o site. Possui uma pasta de actions e redurcers onde é feita a integração com o banco de dados da aplicação. Nelas é controlada as funções que acessa o banco de dados para
pegar informações dos videos.

## Sobre
Último projeto que realizei no meu curso de Full Stack Web Developer que realizei na instituição Labenu.
Esse projeto foi inspirado no Youtube. Ele consiste em 6 paginas (Login, Signup, ChangePassword, Feed, SendVideo e editVideo). Nesse projeto e possível criar um login para novos usuários, além disso e possível mudar a senha e logar. No feed aparecem todos os videos enviados. Além disso na tela de feed é possivel excluir um video ou clicar no icone de edição ou de mais informações do video. Na tela de edição e possível editar o titúlo ou descrição do video clicado. Na tela de mais informações do video, aparecem os dados do video clicado(title,url,descrição) e também alguns dados do usuário logado no momento(nome do usuário, foto). Toda parte de usuário e feita usando o firebase authentication diretamente no front.


## Instruções para rodar
Por ser um projeto com ReactJS, há a necessidade do NodeJS. Com ele em sua máquina, basta abrir o terminal e navegar até o repositório clonado e rodar:
1. `npm install` para instalar todas as dependências;
2. `npm run start` para rodar localmente o projeto
3. `npm run build` para gerar uma versão estática do projeto (que ficará na pasta `build`)

## Contato
Lucas Campioto Constantino
l_campioto@hotmail.com
(011) 94783-7190