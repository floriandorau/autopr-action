# autopr-action
Github action to automatically create pull request for newly pushed branches.

## Usage ##

Register the _autpr-action_ in your `.github/main.workflow` according to the following.

```
workflow "Create pull request for pushed branch" {
  on = "create"
  resolves = ["auto-create-pullrequest"]
}

action "auto-create-pullrequest" {
  uses = "floriandorau/autopr-action@master"
  secrets = ["GITHUB_TOKEN"]
}
```

By default, all created _Pull request_ will be merged into the `master` branch. If you want merge your features into different branch, make use of `AUTOPR_BASE_BRANCH` env var to overrides this with your desired branch name.
