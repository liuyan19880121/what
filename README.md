##proxy for git
```
set http_proxy="http://*.*.*.*:*"
set https_proxy="http://*.*.*.*:*"

git config --global https.proxy "http://*.*.*.*:*"
git config --global http.proxy "http://*.*.*.*:*"

git config --global --get https.proxy
git config --global --get http.proxy
git config --global --unset https.proxy
git config --global --unset http.proxy
```

##ssh
```
ssh-keygen -t rsa -b 4096 -C "liuyan19880121@sina.com"
what

private: what
put: what.pub -> githup.com

ssh-agent -s

set SSH_AUTH_SOCK=/tmp/ssh-PQdjU56820/agent.56820

ssh-add ../.ssh/what

ssh -T git@github.com
```

##git
```
git config --global user.email "liuyan19880121@sina.com"
git config --global user.name "liuyan19880121"

git init
git add *
git commit -m "first commit"
git remote add origin git@github.com:liuyan19880121/what.git
git remote add origin https://github.com/liuyan19880121/what.git

git push -u origin master

git reset --hard
git fetch origin master
git log -p master..origin/master
git merge origin/master
```