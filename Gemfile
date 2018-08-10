source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.0.6'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'pry'
gem 'config'
gem 'rubocop'
gem 'omniauth-google-oauth2'
gem 'activerecord-import'
gem 'bootstrap-glyphicons'
gem 'bootstrap-sass', '3.3.7'
gem 'bootstrap-will_paginate', '1.0.0'
gem 'faker', '1.7.3'
gem 'figaro'
gem 'font-awesome-rails'
gem 'slim-rails', '3.1.1'
gem 'will_paginate', '3.1.6'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'jquery-validation-rails'
gem 'jquery-turbolinks'
gem 'bootstrap_notify'
gem 'rails-assets-sweetalert2', '~> 5.1.1', source: 'https://rails-assets.org'
gem 'sweet-alert2-rails'
gem 'recaptcha', require: 'recaptcha/rails'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'bcrypt', '~> 3.1.7'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'web-console', '>= 3.3.0'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
