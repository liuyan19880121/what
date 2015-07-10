proxy for git
set http_proxy="http://10.204.186.175:9990"
set https_proxy="http://10.204.186.175:9990"

ssh-keygen -t rsa -b 4096 -C "liuyan19880121@sina.com"
what

private: what
put: what.pub -> githup.com

ssh-agent -s

set SSH_AUTH_SOCK=/tmp/ssh-PQdjU56820/agent.56820

ssh-add ../.ssh/what

ssh -T git@github.com