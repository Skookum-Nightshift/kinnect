# Heroku

To have Heroku deploys:

```bash
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

Try a deploy: it should successfully compile assets.

Our project entails the sending of pictures between “senders,” most likely grandkids and distant relatives, to “receivers,” most likely grandparents or other distant relatives.  Our concept, #kinnect, will scrape images from Social Media and local photos, present a screening/ veto step for Senders, and then batch send them to the Receiver.  Receivers will them view them on the simplest of interfaces, most likely just a scrolling photo real accessible via hyperlink.
