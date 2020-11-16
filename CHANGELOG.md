<a name="1.7.1"></a>
## [1.7.1](https://github.com/chrisvxd/story2sketch/compare/v1.7.0...v1.7.1) (2020-11-16)


### Bug Fixes

* address skipped layers by updating html-sketchapp to 4.4.1 ([8ab4dc7](https://github.com/chrisvxd/story2sketch/commit/8ab4dc7))



<a name="1.7.0"></a>
# [1.7.0](https://github.com/chrisvxd/story2sketch/compare/v1.6.1...v1.7.0) (2019-09-17)


### Bug Fixes

* fix a bug where storybook without any stories runs forever ([1ff355e](https://github.com/chrisvxd/story2sketch/commit/1ff355e))


### Features

* upgrade to html-sketchapp@4.3.0 ([a453cda](https://github.com/chrisvxd/story2sketch/commit/a453cda))
* use dynamic thread count for concurrency ([fbe3d79](https://github.com/chrisvxd/story2sketch/commit/fbe3d79))



<a name="1.6.1"></a>
## [1.6.1](https://github.com/chrisvxd/story2sketch/compare/v1.6.0...v1.6.1) (2019-07-12)


### Bug Fixes

* handle replacing multiple spaces and slashes within a story name ([9b58e3d](https://github.com/chrisvxd/story2sketch/commit/9b58e3d))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/chrisvxd/story2sketch/compare/v1.5.0...v1.6.0) (2019-05-20)


### Features

* upgrade to html-sketchapp@4.2.0 ([4db4157](https://github.com/chrisvxd/story2sketch/commit/4db4157))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/chrisvxd/story2sketch/compare/v1.4.0...v1.5.0) (2019-04-22)


### Bug Fixes

* correct logs when outputting by group ([bb67cd1](https://github.com/chrisvxd/story2sketch/commit/bb67cd1))
* ensure outputBy param works correctly ([11fd7f4](https://github.com/chrisvxd/story2sketch/commit/11fd7f4))


### Features

* add support for grouping by symbols by "group" key ([f2a9ee0](https://github.com/chrisvxd/story2sketch/commit/f2a9ee0))
* add support for outputting multiple files by kind, or laying out stories by kind ([6290cae](https://github.com/chrisvxd/story2sketch/commit/6290cae))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/chrisvxd/story2sketch/compare/v1.3.1...v1.4.0) (2018-12-03)


### Features

* add opt-in fix for pseudo-elements ([b1eb6a5](https://github.com/chrisvxd/story2sketch/commit/b1eb6a5))
* remove iframe body margin by default ([5a4b1e9](https://github.com/chrisvxd/story2sketch/commit/5a4b1e9))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/chrisvxd/story2sketch/compare/v1.3.0...v1.3.1) (2018-10-15)


### Bug Fixes

* ensure preview is object with getStorybook() for storybook@3 ([1fe6409](https://github.com/chrisvxd/story2sketch/commit/1fe6409))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/chrisvxd/story2sketch/compare/v1.2.0...v1.3.0) (2018-08-08)


### Features

* update to html-sketchapp@4.0.0 ([cfcf827](https://github.com/chrisvxd/story2sketch/commit/cfcf827))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/chrisvxd/story2sketch/compare/v1.1.0...v1.2.0) (2018-08-08)


### Features

* add forward compatibility for storybook@4 ([fc39738](https://github.com/chrisvxd/story2sketch/commit/fc39738))
* add support for puppeteer.launch options ([66a8e57](https://github.com/chrisvxd/story2sketch/commit/66a8e57))
* upgrade to html-sketchapp@3.3.1 ([51ef691](https://github.com/chrisvxd/story2sketch/commit/51ef691))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/chrisvxd/story2sketch/compare/v1.0.1...v1.1.0) (2018-06-19)


### Features

* add better error handling if story doesn't exist ([54bdfc1](https://github.com/chrisvxd/story2sketch/commit/54bdfc1))
* upgrade to html-sketchapp@3.2.0 ([61be07b](https://github.com/chrisvxd/story2sketch/commit/61be07b))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/chrisvxd/story2sketch/compare/v1.0.0...v1.0.1) (2018-05-09)


### Bug Fixes

* order symbols correctly when using concurrency ([758f0da](https://github.com/chrisvxd/story2sketch/commit/758f0da))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/chrisvxd/story2sketch/compare/v0.3.0...v1.0.0) (2018-05-01)


### Bug Fixes

* add missing babel-runtime dependency ([6f9155f](https://github.com/chrisvxd/story2sketch/commit/6f9155f))
* use and document correct querySelector default ([c879c0b](https://github.com/chrisvxd/story2sketch/commit/c879c0b))


### Features

* add "viewport" config for totally custom viewports ([6d42d50](https://github.com/chrisvxd/story2sketch/commit/6d42d50))
* upgrade to html-sketchapp@3.1.0 ([637aab9](https://github.com/chrisvxd/story2sketch/commit/637aab9))


### BREAKING CHANGES

* remove `narrowViewport` and `standardViewport` configuration options. Use
`viewports` instead.



<a name="0.3.0"></a>
# [0.3.0](https://github.com/chrisvxd/story2sketch/compare/v0.2.1...v0.3.0) (2018-04-24)


### Features

* generate layer name based on id, class or node type ([008dd16](https://github.com/chrisvxd/story2sketch/commit/008dd16))
* group Sketch layers based on DOM tree ([0c3947d](https://github.com/chrisvxd/story2sketch/commit/0c3947d))
* upgrade to html-sketchapp@3.0.2 ([07375cb](https://github.com/chrisvxd/story2sketch/commit/07375cb))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/chrisvxd/story2sketch/compare/v0.2.0...v0.2.1) (2018-03-26)


### Bug Fixes

* ensure standard viewport output uses correct emoji ([fb4ab18](https://github.com/chrisvxd/story2sketch/commit/fb4ab18))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/chrisvxd/story2sketch/compare/0.1.4...v0.2.0) (2018-03-26)


### Features

* upgrade html-sketchapp to 2.0 ([23001fe](https://github.com/chrisvxd/story2sketch/commit/23001fe))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/chrisvxd/story2sketch/compare/0.1.3...0.1.4) (2018-01-25)


### Bug Fixes

* ensure prod dependencies are installed when using npm ([ad27893](https://github.com/chrisvxd/story2sketch/commit/ad27893))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/chrisvxd/story2sketch/compare/0.1.2...0.1.3) (2018-01-25)


### Bug Fixes

* ensure lib is correctly published ([93e7b7a](https://github.com/chrisvxd/story2sketch/commit/93e7b7a))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/chrisvxd/story2sketch/compare/0.1.1...0.1.2) (2018-01-24)


### Bug Fixes

* fix behaviour without configuring package.json ([f45eb3f](https://github.com/chrisvxd/story2sketch/commit/f45eb3f))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/chrisvxd/story2sketch/compare/0.1.0...0.1.1) (2018-01-24)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/chrisvxd/story2sketch/compare/cae6d38...0.1.0) (2018-01-24)


### Features

* add initial code, squashed as one commit ([cae6d38](https://github.com/chrisvxd/story2sketch/commit/cae6d38))



