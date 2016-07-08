/**
 * =============================================================================
 *  FIS3 配置
 * =============================================================================
 *
 * @author 董经伟
 * @create 2015-08-20
 *
 * @update 2016-06-24 董经伟
 *
 */


/**
 * -----------------------------------------------------------------------------
 *  常规配置
 * -----------------------------------------------------------------------------
 */

// 需要忽略的文件或文件夹
fis.set('project.ignore', ['*.bat', '*.md', '*.html', 'fis-conf.js', '_dist/**', '_doc/**']);

// 版本号: API 变更时才更新
fis.set('version', '1.0.0');

// 插件配置
// fis.match('/::package', {
  // spriter: fis.plugin('csssprites'),
  // postpackager: fis.plugin('loader', {
  // })
// });
fis.match('/**.png', {
  optimizer: fis.plugin('png-compressor')
}).match('/**.css', {
  optimizer: fis.plugin('clean-css')
  // useSprite: true
}).match('/**.js', {
  optimizer: fis.plugin('uglify-js')
});


/**
 * -----------------------------------------------------------------------------
 *  发布配置
 * -----------------------------------------------------------------------------
 */

// 全部打包
fis.media('all').match('/statics/{images,fonts,sounds}/{(*.*),**/(*.*)}', {
  url:     './$1$2',
  release: '${version}/$1$2'
}).match('/**.css', {
  packTo:  'common.css',
  release: '${version}/common.css'
}).match('/**.js', {
  packTo:  'common.js',
  release: '${version}/common.js'
});

// 合并的顺序
fis.match('/**', {
  packOrder: 5
}).match('/modules/Moniter/**', {
  packOrder: 1
}).match('/vendors/**', {
  packOrder: 2
}).match('/statics/styles/**', {
  packOrder: 4
}).match('/statics/styles/default.css', {
  packOrder: 3
}).match('/modules/Core/**', {
  packOrder: 4
}).match('/modules/Core/core.js', {
  packOrder: 3
});

// 不处理的文件
fis.match('/modules/Mock/**', {
  release: false
}).match('/vendors/json2.js', {
  release: false
}).match('/modules/Moniter/statistic.js', {
  release: false
});

// 部分打包
fis.media('module').match('/**', {
  release: false
}).match('/vendors/doT.js', {
  release: '$0'
}).match('/vendors/json2.js', {
  release: '$0'
}).match('/modules/Util/util.js', {
  release: '${version}/util.js',
}).match('/modules/Core/ajax.js', {
  release: '${version}/ajax.js'
});
