# Coveo Standalone Search Box for Lightning Community
Simple lighting component to create a Coveo Standalone Search Box in a Salesforce Community

# Installation

Start by cloning the repo locally.

```
git clone https://github.com/coveo/community-standalone-search-box
cd community-standalone-search-box
```

Make sure you have NodeJs installed, and then execute 

```
npm install -g gulp
npm install
```

Before deploying, enter your Salesforce credential in a `salesforce.config.json` file (you can simply rename the `salesforce.config.json.sample` file provided and fill it with your informations).

```json
{
  "SF_USERNAME": "USERNAME",
  "SF_PASSWORD": "PASSWORD",
  "SF_SECURITYTOKEN": "SECURITY_TOKEN",
  "SF_SERVERURL": "https://login.salesforce.com"
}
```

Save it and that's it ! Gulp should now be able to deploy the component into your Salesforce organization.

```
gulp
```
