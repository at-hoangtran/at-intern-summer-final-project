class Error::ErrorsController < ApplicationController
  # handle Page not Found
  def not_found
    render_error_not_found
  end

  # handle Internal Server Error
  def internal_server_error
    render_error_internal_server_error
  end

  protected

    def render_error_not_found
      respond_to do |format|
        format.html { render file: "#{Rails.root}/public/404.html" }
        format.json do
          render status: :not_found,
                 json: {
                   errors: ['Sorry the page you requested could not be found']
                 }
        end
      end
    end

    def render_error_internal_server_error
      respond_to do |format|
        format.html { render file: "#{Rails.root}/public/500.html" }
        format.json do
          render status: :internal_server_error,
                 json: {
                   errors: ['There was an internal server error. Please contact Admin']
                 }
        end
      end
    end
end
