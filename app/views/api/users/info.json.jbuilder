json.user do
    json.extract! @user, :id, :email, :name, :created_at, :updated_at
    json.articleIds @user.article_ids
    json.followerIds @user.follower_ids
    json.followingIds @user.following_ids
    json.photoUrl @user.photo.attached? ? @user.photo.url : "https://centre-seeds.s3.amazonaws.com/users/demo.png"
end

json.articles do
    @user.articles.each do |article|
        json.set! article.id do
            json.extract! article, :id, :title, :body
            json.updatedAt article.updated_in_words_with_year
            json.createdAt article.created_in_words_with_year
            json.minRead article.reading_time
            json.authorId article.author.id
            json.photoUrl article.photo.attached? ? article.photo.url : nil
        end
    end
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

json.followers do
    @user.followers.each do |follower|
        json.set! follower.id do
            json.extract! follower, :id, :email, :name, :created_at, :updated_at
            json.followerIds follower.follower_ids
            json.followingIds follower.following_ids
            json.photoUrl follower.photo.attached? ? follower.photo.url : "https://centre-seeds.s3.amazonaws.com/users/demo.png"
        end
    end
end

json.following do
    @user.following.each do |leader|
        json.set! leader.id do
            json.extract! leader, :id, :email, :name, :created_at, :updated_at
            json.followerIds leader.follower_ids
            json.followingIds leader.following_ids
            json.photoUrl leader.photo.attached? ? leader.photo.url : "https://centre-seeds.s3.amazonaws.com/users/demo.png"
        end
    end
end