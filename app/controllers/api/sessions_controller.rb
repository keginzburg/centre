class Api::SessionsController < ApplicationController
  def show
    if logged_in?
      @user = current_user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Invalid login credentials. Please try again.'] }, status: :unauthorized
    end
  end

  def destroy
    if logged_in?
      logout!
      render json: { message: 'Success' }
    end
  end
end
