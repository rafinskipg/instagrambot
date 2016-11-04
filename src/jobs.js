'use strict'

var config = require('config');
var schedule = require('node-schedule');
var ig = require('instagram-node').instagram({});

var HASHTAGS = config.get('HASHTAGS');
var SCHEDULE_TIME = "* /5 * * * *"; //Each 5 minutes?

var jobs = {
  items : [],
  nextJobDate: null
}

function Job(){
  this.startDate = Date.now()
  this.likes = 0
}

Job.prototype.addLike = function(){
  this.likes++
}

function start(token){
  console.log('Starting jobs for bot. Autoliking', HASHTAGS)
  ig.use({ access_token: token });
  //schedule.scheduleJob(SCHEDULE_TIME, jobWork);
  jobWork();
}

function jobWork(){
  var job = new Job()
  jobs.items.push(job)
  jobs.nextJobDate = Date.now() + (60 * 1000 * 5)

  HASHTAGS.forEach(function(tag){
    console.log('Getting tag', tag)
    ig.tag_media_recent(tag, function(err, medias, pagination, remaining, limit) {
      console.log(err, medias, pagination, remaining, limit);
      medias.forEach((media) => {
        addLike(media.id)
        job.likes++
      })
    });
  })
}

function addLike(id){
  ig.add_like(id, function(err, remaining, limit) {
    console.log('Liked <3', id)
  });
}

function getInfo(){
  return {
    last_job: jobs.items[jobs.length - 1].startDate,
    next_job: jobs.nextJobDate,
    likes_made: jobs.items.reduce(function(prev, next) {
      return 0 + next.likes
    }, 0)
  }
}
module.exports = {
  getInfo : getInfo,
  start: start
}