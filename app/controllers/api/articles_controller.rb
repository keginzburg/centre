class Api::ArticlesController < ApplicationController

    wrap_parameters include: Article.attribute_names + [:photo]

    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        if params["limit"]
            limit = params["limit"]
            @articles = Article.includes(:author).all.order('updated_at DESC').limit(limit)
        else
            @articles = Article.includes(:author).all
            render 'api/articles/index'
        end
    end

    def show
        @article = Article.includes(:claps, :clappers).find_by(id: params[:id])
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

    def update
        @article = Article.find_by(id: params[:id])

        unless @article
            render json: { errors: "The requested story could not be found but may be available in the future."}, status: 404
        end

        if @article.author != current_user
            render json: { errors: "You are not this story's author and do not have the necessary permissions to edit it." }, status: 403
        else
            if @article.update(article_params)
                # Below line is what allows user to keep currently attached photo without reappended photoFile from the ArticleEditForm in frontend. Instead, if the user deletes the current photo, then the ArticleEditForm will apply this conditional parameter and cause the detachment.
                @article.photo.detach if params['article']['photo_delete'] == "true"
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
    end

    def destroy
        @article = Article.find_by(id: params[:id])

        unless @article
            render json: { errors: "The requested story could not be found but may be available in the future."}, status: 404
        end
        
        if @article.author != current_user
            render json: { errors: "You are not this story's author and do not have the necessary permissions to delete it." }, status: 403
        else 
            if @article.destroy
                render 'api/articles/show'
            else
                render json: { errors: "We're unable to delete that story. Please try again." }, status: 400
            end
        end
    end

    private

    def article_params
        params.require(:article).permit(:title, :body, :photo)
    end
end