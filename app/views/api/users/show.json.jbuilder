json.user do
    json.extract! @user, :id, :email, :name, :created_at, :updated_at
    json.articleIds @user.article_ids
    json.followerIds @user.follower_ids
    json.followingIds @user.following_ids
    json.photoUrl @user.photo.attached? ? @user.photo.url : "https://centre-seeds.s3.amazonaws.com/users/demo.png"
end

json.follows do
    @user.follows.each do |follow|
        json.set! follow.id do
            json.extract! follow, :id, :follower_id, :user_id, :created_at, :updated_at
        end
    end
    @user.leads.each do |lead|
        json.set! lead.id do
            json.extract! lead, :id, :follower_id, :user_id, :created_at, :updated_at
        end
    end
end