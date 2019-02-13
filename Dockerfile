FROM node:11-alpine

LABEL "com.github.actions.name"="Auto-create pull requests"
LABEL "com.github.actions.description"="Automatically create pull requests"
LABEL "com.github.actions.icon"="git-pull-request"
LABEL "com.github.actions.color"="blue"

RUN apk add --no-cache git openssl

COPY . .

ENTRYPOINT [ "./bin/autopr.js" ]