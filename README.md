# GitHub Activity CLI

A simple CLI tool to fetch and display GitHub activities for a given username. Optionally, you can filter by a specific event type.

For more information on this project idea, visit [roadmap.sh](https://roadmap.sh/projects/github-user-activity)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Fetches all recent GitHub activities of a user.
- Filters activities by event type (e.g., PushEvent, ForkEvent).
- Displays detailed information for each event using custom templates.

## Prerequisites


- [Node.js](https://nodejs.org/) (v12.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
## Installation

1. Clone this repository to your local machine:

    ```sh
    git clone https://github.com/aimless-coder/Github_Activity.git
    ```

2. Navigate to the project directory:

    ```sh
    cd Github_Activity
    ```

3. Install the required dependencies:

    ```sh
    npm install
    ```

4. Install CLI tool.

    
## Usage

To run the CLI tool, use the following syntax:

```github-activity <username> <eventName(optional)>```

### Examples:

- Fetch all activities for the user johndoe:

``` github-activity johndoe ```

- Fetch only the PushEvent activities for the user johndoe:

```github-activity johndoe PushEvent```

### Supported Events
The following GitHub events are supported:

- PushEvent
- PullRequestEvent
- IssuesEvent
- ForkEvent
- WatchEvent
- CreateEvent
- DeleteEvent
- ReleaseEvent
- GollumEvent
- PublicEvent
- MemberEvent
- CommitCommentEvent
- IssueCommentEvent
- PullRequestReviewEvent
- RepositoryEvent
- And many more...



