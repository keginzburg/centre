class Api::ArticlesController < ApplicationController

    wrap_parameters include: Article.attribute_names + [:photo]

    before_action :require_logged_in, only: [:create]

    def index
        if params["limit"]
            limit = params["limit"]
            @articles = Article.includes(:author).all.limit(limit)
        else
            @articles = Article.includes(:author).all
            render 'api/articles/index'
        end
    end

    def show
        @article = Article.find_by(id: params[:id])
        if @article
            render 'api/articles/show'
        else
            render json: { errors: "Page Not Found 404" }, status: 404
        end
    end

    def create
        @article = Article.new(article_params)
        @article.author = current_user

        if @article.save
            render 'api/articles/show'
        else
            errors = { title: nil, body: nil, user_id: nil }

            @article.errors.full_messages.each do |error|
                errors[:title] = error if error.include?("Title")
                errors[:body] = error if error.include?("Body")
                errors[:user_id] = error if error.include?("User")
            end

            render json: { errors: errors }, status: :unprocessable_entity
        end
    end

    private

    def article_params
        params.require(:article).permit(:title, :body, :photo)
    end
end