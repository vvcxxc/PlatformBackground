a=`stat -c %Y package.json`
b=$(cat update_time.text)

if [ "$a" > "$b" ]
  npm i
  echo a > update_time.text
fi

npm run build:test
