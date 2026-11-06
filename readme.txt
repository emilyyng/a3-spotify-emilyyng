--Readme document for Emily Yang, emilyy12@uci.edu and Sherry Tram, smtram@uci.edu--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 Communicating with the webserver
- 1/1 Populating information about the user
- 3/3 Populating the search component
- 3/3 Artist page
- 1.5/1.5 Album page
- 0.5/0.5 Track page

2. How long, in hours, did it take you to complete this assignment?

It took us [] hours in total to complete this assingment. 

3. What online resources did you consult when completing this assignment? (list specific URLs)

- Course lecture videos and demo code
- Angular @for documentation: https://angular.dev/api/core/@for
- W3Schools option element reference: https://www.w3schools.com/tags/att_option_selected.asp
- Spotify Web Playback SDK documentation: https://developer.spotify.com/documentation/web-playback-sdk/
- Spotify Web Playback SDK guide: https://developer.spotify.com/documentation/web-playback-sdk/guide/
- Spotify February 2026 Web API migration guide: https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

We (Emily and Sherry) worked together as partners, discussing how to take on each part, dividing the work, and reviewing each other's code for bugs. 
We did not consult others for this assignment.

5. Did you add a bonus feature to your submission? If so, what is it and how should we see it?

(a) Web Playback SDK player (extra credit). On the track page, a player plays the full track in the browser, with album art, track and artist names, 
a progress bar, and play/pause controls. It needs a Spotify Premium account and the real webserver (not the dummy), so see extra_credit.mp4 for a demo. 
On the dummy server it appears but does not work (it stays on "Connecting..." or shows an error, and the Play button is disabled), while the rest 
of the track page works normally.
On the real server, top tracks and popularity are missing on the artist page, because Spotify removed them for new apps in February 2026. 
They work on the dummy server. 

(b) Search improvements. Enter in the search box runs the search, changing the category dropdown re-runs it, and switching the category no longer breaks the page.

6. Is there anything special we need to know in order to run your code?

This may or may not be relevant to how the code is run, but we put the dummy_webserver/ in the .gitignore
