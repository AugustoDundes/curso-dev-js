cd /d C:\Users\48397002812\Desktop
mkdir public
mkdir src
mkdir docs
cd public
mkdir html
mkdir css
mkdir js
mkdir media
cd media
cd
cd..
cd html
echo Projeto Responsivo > home.html
cd ..\css
echo body {margin: 0; padding: 0; background-color: lightgray; } > theme.css
cd ..\media
mkdir imagens
mkdir fontes
cd ..\css
copy theme.css ..\..\docs
cd ..\js
echo console.log("Site responsivo pronto!"); > responsivo.js
echo console.log("Utilitários carregados!"); > utils.js
rename utils.js helpers.js
dir /s ..
cd ..\..\docs
del theme.css
cd ..\public\html
notepad home.html

end
