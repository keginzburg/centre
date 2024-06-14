class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']
  
    def show
      @user = User.includes(:articles, :follows, :followers, :following).find_by(id: params[:id])

      if @user
        render 'api/users/info'
      else
        render json: { errors: "The Centre user could not be found but may be available in the future."}, status: 404
      end
    end

    def create
      @user = User.new(user_params)
      
      if @user.save
        login!(@user)
        render 'api/users/show'
      else
        errors = { email: nil, name: nil, password: nil }
       
        @user.errors.full_messages.each do |error|
          errors[:email] = error if error.include?("Email")
          errors[:name] = error if error.include?("Name")
          errors[:password] = error if error.include?("Password")          
        end

        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :password, :name)
    end
end