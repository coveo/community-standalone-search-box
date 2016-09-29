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

#How do I use it ?

Let's assume you already have a Coveo search page in your community.

First, you'll need to edit the Coveo Search lightning component and uncheck the `Auto-initilize` option.

Next, go to the `Settings` > `Theme` tab in your Community builder.
You should see an option named `Use a custom search component`, enable it and select the `CoveoSearchBar` in the dropdown below it.

Finally, go back to the `Page Editor` and select the search bar.
The default "search url" (your Coveo search page name) is `coveosearch`, change it if needed.

# Known issues
The project is meant to be an example of what you can achieve with the new "search region" and Coveo's search box.
There's still some known issues and we don't support that component as for now so use it at your own risk.

Of course, if you find a bug and fix it, I'll be more than happy to accept your pull request ;)

