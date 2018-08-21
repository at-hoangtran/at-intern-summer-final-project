class CategoriesController < ApplicationController
  before_action :load_category, only: %i[show]

  def show; end

  private

    def load_category
      @category = Category.find_by id: params[:id]
      @category || render(file: 'public/404.html', status: 404, layout: true)
    end
end
