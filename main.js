#!/usr/bin/env node

const argv = process.argv.slice(2);

//Map all the github Events with its templates.
const githubEvents = {
    PushEvent: 'Pushed {number} commit(s) to {repository}',
    PullRequestEvent: '{action} a pull request in {repository}',
    IssuesEvent: '{action} an issue in {repository}',
    ForkEvent: 'Forked {repository} to {newRepository}',
    WatchEvent: 'Starred {repository}',
    CreateEvent: 'Created a {refType} in {repository}',
    DeleteEvent: 'Deleted a {refType} in {repository}',
    ReleaseEvent: 'Published a release {releaseName} in {repository}',
    GollumEvent: 'Updated the wiki page {pageName} in {repository}',
    PublicEvent: 'Made {repository} public',
    MemberEvent: '{action} {member} as a collaborator to {repository}',
    CommitCommentEvent: 'Commented on a commit in {repository}',
    IssueCommentEvent: '{action} a comment on an issue in {repository}',
    PullRequestReviewEvent: '{action} a review on a pull request in {repository}',
    PullRequestReviewCommentEvent: '{action} a comment on a pull request review in {repository}',
    RepositoryEvent: '{action} the repository {repository}',
    SponsorshipEvent: '{action} a sponsorship',
    TeamAddEvent: 'Added a repository `{repository}` to the team {team}',
    DeploymentEvent: 'Deployed to {environment} in {repository}',
    DeploymentStatusEvent: 'Updated deployment status to {state} in {repository}',
    CheckRunEvent: 'A check run {checkRunName} was {action} in {repository}',
    CheckSuiteEvent: 'A check suite {checkSuiteName} was {action} in {repository}',
    MarketplacePurchaseEvent: '{action} a marketplace plan',
    OrganizationEvent: '{action} an organization',
    ProjectCardEvent: '{action} a project card in {repository}',
    ProjectColumnEvent: '{action} a project column in {repository}',
    ProjectEvent: '{action} a project in {repository}',
};

//Generate each customize template according to the event.
const generateEventDescription = (event) => {
    const eventType = event.type;
    const descriptionTemplate = githubEvents[eventType];

    if (!descriptionTemplate) {
        return `Unknown event type: ${eventType}`;

    }else {        
        const description = descriptionTemplate
            .replace('{number}', event.payload.size || '')
            .replace('{repository}', event.repo.name)
            .replace('{action}', event.payload.action || '')
            .replace('{newRepository}', event.payload.forkee?.full_name || '')
            .replace('{refType}', event.payload.ref_type || '')
            .replace('{ref}', event.payload.ref || '')
            .replace('{releaseName}', event.payload.release?.name || '')
            .replace('{pageName}', event.payload.pages ? event.payload.pages[0].page_name : '')
            .replace('{member}', event.payload.member?.login || '')
            .replace('{team}', event.payload.team?.name || '')
            .replace('{environment}', event.payload.deployment?.environment || '')
            .replace('{state}', event.payload.deployment_status?.state || '')
            .replace('{checkRunName}', event.payload.check_run?.name || '')
            .replace('{checkSuiteName}', event.payload.check_suite?.name || '');

            return `- ${description}`;
    }
};

//Get username, fetch JSON data and render on CLI.
const getActivity = async() => {

    const username = argv[0];
    const eventType = argv[1];
    const activity = [];

    const url = `https://api.github.com/users/${username}/events`;

    try{
        if(!username){
            console.log("Username cannot be empty");
            showHelp();
        }else{
                const res = await fetch(url);
                const data = await res.json();
        
                if(data.message === "Not Found"){
                    throw new Error;
                } else if(eventType){
                   Object.keys(data).forEach(key => {
                    const event = data[key];
                        if(event.type === eventType){
                            const generatedData = generateEventDescription(event);
                            activity.push(generatedData);
                        }
                });
                } else {
                    Object.keys(data).forEach(key => {
                        const event = data[key];
                        const generatedData = generateEventDescription(event);
                        activity.push(generatedData);
                });
                };
    
                if(activity.length === 0){
                    if(eventType){
                        console.log(`No activity found of ${eventType} for ${username}`);
                        showHelp();
                    }
                    else{
                        console.log(`No event found for ${username}`);
                    }
                }else{
                    console.log(`Github Activity of ${username}: `)
                    activity.forEach(activity => console.log(activity));
                }
            }
    }
    catch (error) {
            console.error("Error: Unable to fetch data. Please check your network connection or try again later.");
        console.error(error);
    }
    };

//Show help menu
const showHelp = () => {
    console.log(`
Usage: github-activity <username> <eventName(Optional)>

Examples:
  github-activity johndoe                     Fetch and display the GitHub activity of the user 'johndoe'
  github-activity johndoe PushEvent           Fetch and display only PushEvent for 'johndoe'
`);
};

getActivity();