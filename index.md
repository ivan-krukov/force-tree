---
layout: page
title: Genes and Coinflips
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

Pages
---

<ul class="pages">
	{% for page in site.pages %}
		<li><a href="{{ BASE_PATH }}{{page.url }}">{{ page.title }}</a></li>
	{% endfor %}
</ul>
