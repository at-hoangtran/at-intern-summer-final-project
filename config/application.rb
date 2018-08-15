require_relative 'boot'

require 'rails/all'
require 'rubyXL'
require 'roo'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module FinalProject
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths << "#{Rails.root}/lib"
    config.action_view.embed_authenticity_token_in_remote_forms = true
    config.time_zone = "UTC"
    config.active_record.default_timezone = :utc

    if defined?(Rails::Server)
      config.after_initialize do
        Rails.application.load_tasks
        Rake::Task['start:setIntervel'].invoke
      end
    end

    config.cache_store = :redis_store, {
      host: "localhost",
      port: 6379,
      db: 0,
    }, {expires_in: 7.days}
  end
end
