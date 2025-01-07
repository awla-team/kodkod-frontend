## How to Deploy a New Release

Follow these steps to deploy a new release:

1.  **Create a New Branch**: Create a new branch from `develop` in your local machine.

    ```bash
    git checkout -B release/{version}
    ```

    Example:

    ```bash
    git checkout -B release/1.0.0
    ```

2.  **Update the Version Number**: Update the version number in the `package.json` file.

    ```json
    {
      "version": "1.0.0"
    }
    ```

    Commit the changes:

    ```bash
    git add package.json
    git commit -m "chore: update app version to 1.0.0"
    ```

3.  **Publish the branch**: Push the branch to the remote repository.

    ```bash
    git push origin release/1.0.0
    ```

4.  **Create a Pull Request**: Create a pull request from the `release/{version}` branch to the `master` branch.
5.  **Merge the Pull Request**: Merge the pull request if the staging CI/CD pipeline (api-sandbox.kodkod.cl) is successful and the code is reviewed. Use "Create a merge commit" as the merge strategy.
6.  **Update Master Branch**: Checkout the `master` branch and pull the changes.
7.  **Tag the Master Branch**: Tag the `master` branch with the version number.

    ```bash
    git tag v1.0.0
    ```

    You can also create an annotated tag with a message:

    ```bash
    git tag -a v1.0.0 -m "Release 1.0.0"
    ```

8.  **Push the Tag**: Push the tag to the remote repository.

    ```bash
    git push origin v1.0.0
    ```

9.  **Create a New Release on GitHub**: Go to GitHub and [create a new release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#about-release-management) with the tag you just pushed. Once the release is published, the CI/CD pipeline will deploy the new version to the production environment.
10. **Update Develop Branch**: Back to your local machine, checkout the `develop` branch and update it with the new tag from the `master` branch.

    ```bash
    git checkout develop
    git merge --no-ff v1.0.0
    git push origin develop
    ```

11. **Delete the Release Branch**: Delete the `release/{version}` branch from your local machine:

    ```bash
    git branch -D release/1.0.0
    ```

    And from the remote repository:

    ```bash
    git push origin --delete release/1.0.0
    ```
