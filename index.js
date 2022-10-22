#!/usr/bin/env node

const { exec, spawn } = require('child_process')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
.command('$0 <url>', 'youtube url')
.option('log-level', {
    alias: 'l',
    default: 'info',
    describe: 'mpv log level',
    type: 'string',
    choices: ['no', 'fatal', 'error', 'warn', 'info', 'status', 'v', 'debug', 'trace']
})
.option('audio-selector', {
    alias: 'a',
    default: 'bestaudio',
    describe: 'audio selector',
    type: 'string'
})
.option('video-selector', {
    alias: 'v',
    default: 'bestvideo[height<=1080]',
    describe: 'video selector',
    type: 'string'
})
.option('list-formats', {
    alias: 'f',
    type: "boolean",
    default: false
})
.option('debug', {
    type: "boolean",
    default: false
})
.argv

const url = argv.url
const aid = argv.a
const vid = argv.v
const logLevel = argv.l

if (argv.f) {
    exec(`yt-dlp -F "${url}"`, (error, stdout, stderr) => {
        if (error) {
            throw new Error(`error: ${error.message}`)
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`)
        }
        console.log(`${stdout}`)
    })
} else {
    const mpv = spawn('mpv', ['--script-opts=ytdl_hook-ytdl_path=yt-dlp', `--msg-level=all=${logLevel}`, `--ytdl-format=${vid}+${aid}`, url])
    mpv.stdout.on('data', data => {
        console.log(`stdout: ${data}`)
    })
    mpv.stderr.on('data', data => {
        console.log(`stderr: ${data}`)
    })
    mpv.on('error', error => {
        console.log(`error: ${error.message}`)
    })
    mpv.on('close', code => {
        console.log(`child process exited with code ${code}`)
    })
}
