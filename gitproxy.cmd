#!/bin/sh
# Use socat to proxy git through an HTTP CONNECT firewall.
# Useful if you are trying to clone git:// from inside a company.
# Requires that the proxy allows CONNECT to port 9418.
#
# Save this file as gitproxy somewhere in your path (e.g., ~/bin) and then run
#   chmod +x gitproxy
#   git config core.gitproxy gitproxy
#
# More details at http://tinyurl.com/8xvpny
 
# Configuration. Common proxy ports are 3128, 8123, 8000.
_proxy=proxy.yourcompany.com
_proxyport=3128
 
exec socat STDIO PROXY:$_proxy:$1:$2,proxyport=$_proxyport