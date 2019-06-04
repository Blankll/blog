<template>
  <div>
    <div class="image">
      <img :src="ArticleImage" alt="" srcset="" class="article-image" />
    </div>
    <div class="placeholder"></div>
    <div class="article-content">
      <p class="title">title</p>
      <div class="content">
        本文只是个人从实际开发经验中总结的一些东西，并不是什么名言警句，写出来有两个目的：一是时刻提醒自己要按照这些知识点来写自己代码，二是为了分享，说不定对你有用呢？万一，是吧。。。
1.首要意识：安全

大多数时候，我们开发的Web程序都是需要跟数据库打交道的，所以这里几乎可以说SQL注入是一个怎么也无法避免要拿出来讨论一下的问题。而且近年来像XSS和CSRF攻击也变得大行其道，使得"黑客"们貌似又有了一把把利器，而我们总是处于被动的状态。不过我们要记得是下面这两个原则：

1. 永远不要相信用户输入的东西。（老话了，但这是真的）

2. 将自己需要输出的数据进行转义。

简单来说就是：filter input , escape output

如果你是新手，不要再使用类似以下的查询语句了：

SELECT FROM users WHERE username = $_POST['username'] AND password = $_POST['password'];

还有就是，使用PDO或Mysqli吧，不要再使用老式的mysql操作了。

而对于，CSRF的解决方案，目前接触的都是给每一次的表单提交都设置一个token值，然后在表单提交的时候校验之即可。
2.明确地知道各个比较操作符的差别

PHP的比较操作符,这其实可以说是一个很小的注意点，但是在某些时候真的很重要。比如说很多时候我们得考虑清楚，该用==还是===，如果你使用过strpos()这个函数，下面的代码可能会给你一个直观的感受：

<?php

 

$authors = 'Chris & Sean';

 

if (strpos($authors, 'Chris')) {

    echo 'Chris is an author.';

} else {

    echo 'Chris is not an author.';

}

上面这段代码的运行结果其实是输出Chris is not an author，但是现实情况是，Chris & Sean真的是Author啊，怎么回这样呢？其实是这样的：Chris正好出现在Chris & Sean首位开始处，也就是0这个位置，所以substr()返回了，由于条件判断语句中bool判断，所以0作为了false处理，于是程序输出了Chris is not an author，但是在这种情况之下我们该怎么处理呢？我们其实可以这样的：

<?php

 

if (strpos($authors, 'Chris') !== FALSE) {

    echo 'Chris is an author.';

} else {

    echo 'Chris is not an author.';

}


这里的!==和!=的不同就体现出来了。
3.可以减少使用else就少使用else

    此处有误人子弟之嫌疑，请大家警惕，还是自己喜欢的那样好。

这个貌似从我一开始接触编程就有的一个想法，因为每次看到if(){}else{}就有一种这一段其实可以写得更好的感觉，因为一旦你减少了使用else关键字，你得代码会减少两行！没错，两行也是我们的追求，而且，从我的经验看，else少的代码貌似可读性更高，对我来说。

if( this condition )

{

$x = 5;

}

else

{

$x = 10;

如果，在$x的默认值是10，还是下面这样写感觉比较好：

$x = 10;

if( this condition )

{

$x = 5;

}

4.使用一个好的IDE

对，我可以说就是IDE控，并且是JetBrains家的粉。在开发PHP应用的时候，我首先会推荐大家使用PhpStorm，这么智能的IDE会帮你解决掉很多不必要的错误，比如很多Laravel的初学者都会遇到类似：

App\Http\Controller\Article not found;

这样的错误，你要是使用PhpStorm，自动就会帮你use App\Article;，又何必去受这些挫折和打击自己的自信心？
5.多用str_replace()

在很多时候我们需要对一些字符串进行替换，在PHP中有以下几个函数可以达到这个目的：

str_replace()

ereg_replace()

preg_replace()

如果你确实是需要使用正则匹配，那就使用preg_replace()，而如果在可实现替换的情况下，请使用str_replace()，因为据不完全统计，str_replace()的效率在这三个当中是最高的。
6.使用三元运算符

这个可能很多人都有这个感受，使用三元运算符之后，我们可以去掉一堆if else语句了，代码又短又爽。

$host = strlen($host) > 0 ? $host : htmlentities($host);

7.使用缓存

目前PHP热门的缓存技术可能就是Redis和Memcached了，在PHP的官方文档中，也有Memcached的使用教程，至于Redis，我最近在研究中，后续会给出一些教程，如果一切顺利的话。
8.使用框架

框架的好处很多，可能是在性能方面有所损失外，貌似找不到不用框架的理由了，框架即可以加快你的开发速度，也可以让你在写代码的过程中撸的舒舒服服，而且想很多安全问题，你都会得到很好的解决。我这里首推Laravel，不过像Yii2 Slim Symfony都是非常棒的框架，除了Symfony没有尝过过之外，剩下的三个我都有使用经历，最后就基本是用Laravel了。不过我建议的Laravel可能不适合你，这还是得看个人喜好。
9.用isset()代替strlen()

如果你需要在项目代码中需要根据一个字符串的长度来做条件判断，这个时候非常推荐你直接使用isset()，因为在同等条件之后，isset()的速度是strlen()的五倍左右，所以：
if (isset($username[5])) {

    // The username is at least six characters long.

}



if (strlen($username) >= 6) {

    // The username is at least six characters long.

}


以上的两个条件判断都是可以达到相同的目的，但是我推荐使用的是第一种。
      </div>
    </div>
  </div>
</template>
<script>
import ArticleImage from '@/assets/images/article.png'
export default {
  name: 'Article',
  data () {
    return {
      id: -1,
      ArticleImage
    }
  },
  methods: {

  },
  mounted () {
    this.id = this.$route.query.id
    console.log(this.$route.query)
  }
}
</script>
<style lang="stylus" scoped>
.placeholder
  height 150px
.image
  .article-image
    position fixed
    width 100%
    height 700px
    object-fit cover
.article-content
  opacity 0.9
  margin 50px 20%
  @media screen and (max-width: 1000px)
    margin 50px 10px
  background-color #ffffff
  padding 10px
  box-shadow 0 0 .4rem .2rem rgba(236, 240, 241,1.0)
  .title
    text-align center
    font-size 40px
  .content
    font-size 20px
</style>
