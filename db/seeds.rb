# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Clap.destroy_all
    Article.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('articles')
    ApplicationRecord.connection.reset_pk_sequence!('claps')
  
    puts "Creating users..."
    user1 = User.create!(
      name: 'Demo User', 
      email: 'demo@user.io', 
      password: 'password'
    )
    user1.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/demo.png"),
      filename: "demo.png"
    )
  
    # More users
    user2 = User.create!(
      name: 'Amin Babar',
      email: 'amin_meanie@aa.io',
      password: 'password'
    )
    user2.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/amin.png"),
      filename: "amin.png"
    )

    user3 = User.create!(
      name: 'Spencer Iascone',
      email: 'red_dwarf_fan@aa.io',
      password: 'password' 
    )
    user3.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/spencer.jpeg"),
      filename: "spencer.jpeg"
    )

    user4 = User.create!(
      name: 'Kyle Ginzburg',
      email: 'kginzburg@aa.io',
      password: 'password' 
    )
    user4.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/kyle.jpeg"),
      filename: "kyle.jpeg"
    )

    user5 = User.create!(
      name: 'Ayce Lacap',
      email: 'naur@aa.io',
      password: 'password'
    )
    user5.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/ayce.png"),
      filename: "ayce.png"
    )

    user6 = User.create!(
      name: 'Stephen DiPietro',
      email: 'ibuywatches@aa.io',
      password: 'elonmusk'
    )
    user6.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/stephen.jpeg"),
      filename: "stephen.jpeg"
    ) 

    puts "Creating articles..."
    
    article1 = Article.create!(
      title: "A Beginner's Guide to Kayaking Basics",
      body: "Embarking on the thrilling adventure of kayaking opens up a world of excitement and connection with nature. Whether you're paddling through calm waters or tackling challenging rapids, mastering the basics is crucial for a safe and enjoyable experience. In this guide, we'll explore the fundamental skills and knowledge every kayaker should possess. Before dipping your paddle into the water, it's essential to select the right kayak for your adventure. Consider factors such as kayak type, size, and material. Sit-on-top kayaks are great for beginners, offering stability and ease of entry and exit. On the other hand, sit-inside kayaks provide better protection from the elements, making them suitable for cooler climates. Understanding Paddling TecProper paddling techniques are the foundation of a successful kayaking journey. Learn how to hold a paddle correctly, use torso rotation for power, and execute efficient strokes. Mastering basic strokes like the forward stroke, reverse stroke, and sweep stroke will give you the control needed to navigate different water conditions. Safety should always be a top priority when kayaking. Equip yourself with essential safety gear, including a personal flotation device (PFD), a whistle, and appropriate clothing. Understand the basics of self-rescue techniques, such as the Eskimo roll, and practice them in controlled environments before venturing into more challenging waters. Before setting out on your kayaking expedition, familiarize yourself with the waterway's layout and potential challenges. Plan your route, taking into account factors like current speed, wind conditions, and any known obstacles. This preparation will enhance your confidence on the water and ensure a more enjoyable journey. Mastering the basics of kayaking is the key to unlocking the full potential of this thrilling water sport. Whether you're a novice or an experienced paddler, continuous learning and practice will contribute to your skill development and overall enjoyment. So, grab your paddle, don your PFD, and embark on a kayaking adventure that will leave you with lasting memories of the great outdoors.",
      user_id: user2.id
    )
    article1.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/kayak.jpeg"),
      filename: "kayak.jpeg"
    )

    article2 = Article.create!(
      title: "The Cosmic Comedy Classic",
      body: "Red Dwarf, the British sci-fi sitcom, has carved its own niche in the world of television with its unique blend of humor, space adventures, and an eclectic mix of characters. In this short article, we'll explore the enduring appeal of this cult classic that has been entertaining audiences for decades. Red Dwarf takes viewers on a space odyssey like no other. Set aboard the mining spaceship Red Dwarf, the show follows the misadventures of the last human survivor, Dave Lister, his holographic companion Arnold Rimmer, the humanoid cat, and the neurotic mechanoid Kryten. The unlikely crew encounters bizarre phenomena, navigates through parallel universes, and stumbles upon the absurdities of deep space, creating a comedic backdrop for the series. At the heart of Red Dwarf is its unforgettable cast of characters. From the laid-back and curry-loving Lister to the uptight and eternally frustrated Rimmer, each character brings a distinct personality to the fore. The chemistry and banter among the crew contribute to the show's comedic brilliance, making it a beloved classic for fans of science fiction and comedy alike. Since its debut in 1988, Red Dwarf has continued to capture the imaginations of viewers with its wit, humor, and inventive storytelling. Despite its humble beginnings, the show has amassed a dedicated fanbase and stands as a testament to the enduring appeal of well-crafted science fiction comedy. Red Dwarf remains a shining star in the constellation of television classics, offering a delightful escape into the quirky and unpredictable world of deep space. Whether you're a longtime fan or a newcomer to the series, the cosmic escapades aboard the Red Dwarf are sure to leave you with a smile on your face and a fondness for the comedic charm that defines this beloved TV show.",
      user_id: user3.id
    )
    article2.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/red_dwarf.webp"),
      filename: "red_dwarf.webp"
    )

    article3 = Article.create!(
      title: "Miyazaki's Heron Song",
      body: "Hayao Miyazaki's latest film, The Boy and the Heron, may very well be his last. While the Studio Ghibli founder and master animator has declared his retirement multiple times in the past 20 years,The Boy and the Heron telegraphs the signs of the end and a bittersweet goodbye. This latest film may be his most personal and abstract work too. Set in Japan and framed by World War II, the story revolves around a young boy named Mahito, who is coming to terms with his mother's death while also learning to accept his new stepmother's love. Plot-wise, Mahito's growth is framed by a journey into a fantasy realm (complete with Miyazaki motifs and murderous birds - the “warawara” and parakeets steal the show), where he must rescue his stepmother. Many elements of this plot draw inspiration from actual events in Miyazaki's life, highlighting his reflective stance at this stage of his career. In this reflection, Miyazaki appears to have grown as well. While his films have often explored recurring themes of environmentalism, war, and death, Miyazaki has previously expressed cynical and misanthropic beliefs. This is the same man who once stated, “The future is clear. It’s going to fall apart. What’s the use in worrying? It’s inevitable.” However, The Boy and the Heron and its narrative exude much more optimism and acceptance, suggesting that Miyazaki has found peace with his career and faith in future generations to rectify past mistakes. In terms of the film's style, the animation is a true marvel. Miyazaki, an undying advocate for traditional hand-drawn animation, showcases the preciousness of this art style in The Boy and the Heron. As for the film's script, Mahito's journey into the fantasy realm is wondrous, but some aspects of that universe's laws bend to dream logic, which can be frustrating at times. If you approach the film with an open mind and are willing to indulge in Miyazaki's vision, he will offer an experience you won't forget.",
      user_id: user4.id
    )
    article3.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/heron.webp"),
      filename: "heron.webp"
    )

    article4 = Article.create!(
      title: "Fizz, Flavor, and Fermentation",
      body: "Kombucha, a fermented tea beverage, has taken the health and wellness scene by storm, becoming a popular choice for those seeking a flavorful and probiotic-rich drink. This ancient elixir is created through the fermentation of sweetened tea with a symbiotic culture of bacteria and yeast (SCOBY). As the fermentation process unfolds, the result is a fizzy, slightly tangy beverage with a myriad of potential health benefits. Packed with probiotics, enzymes, and antioxidants, kombucha is not only a refreshing alternative to sugary sodas but also believed to support gut health and boost the immune system. From its effervescent bubbles to its diverse flavor profiles, kombucha has become a beloved staple for those looking to sip on a drink that marries taste with wellness.",
      user_id: user5.id
    )
    article4.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/kombucha.jpeg"),
      filename: "kombucha.jpeg"
    )

    article5 = Article.create!(
      title: "The Intricate Art of Analogue Watch Construction",
      body: "Crafting an analogue watch is a meticulous process that combines precision engineering with timeless craftsmanship. Each watch is a masterpiece, a symphony of intricate gears, springs, and wheels working together seamlessly to measure the passage of time. Skilled watchmakers assemble these timepieces with meticulous attention to detail, carefully placing each component by hand. The heart of an analogue watch lies in its mechanical movement, where tiny cogs and levers create the mesmerizing dance of the watch hands. From the precision-cut gears to the polished watch case, the construction of an analogue watch is a testament to the dedication of artisans who uphold the tradition of watchmaking, creating functional works of art that stand the test of time.",
      user_id: user6.id
    )
    article5.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/watch.jpeg"),
      filename: "watch.jpeg"
    )

    article6 = Article.create!(
      title: "Ruby vs. JavaScript: My Two Favorite Languages",
      body: "In the vast realm of programming languages, Ruby and JavaScript emerge as powerful players, each with its unique strengths and purposes. Ruby, renowned for its elegant syntax and object-oriented approach, is often celebrated for its readability and developer-friendly design. Developed by Yukihiro Matsumoto in the mid-1990s, Ruby emphasizes simplicity and productivity, fostering a community that values convention over configuration. It is particularly favored in web development, thanks to the Ruby on Rails framework, which streamlines the creation of robust and scalable web applications. On the other hand, JavaScript, born in the same era, has evolved into a cornerstone of web development. As a client-side scripting language, JavaScript empowers developers to create dynamic and interactive user interfaces. Widely supported by all major browsers, JavaScript enables real-time updates, form validation, and asynchronous operations, enhancing the overall user experience. Moreover, the rise of Node.js has propelled JavaScript into server-side development, allowing developers to use a single language for both client and server-side scripting. While both languages share some commonalities, such as being dynamically typed and supporting object-oriented programming, their fundamental differences lie in their primary use cases and design philosophies. Ruby's focus on simplicity and developer happiness contrasts with JavaScript's versatility as a language that can be utilized both on the client and server sides. Understanding these distinctions is crucial for developers choosing the right tool for a specific project or seeking to broaden their skill set in the ever-evolving landscape of programming languages.",
      user_id: user4.id
    )
    article6.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/language.png"),
      filename: "language.png"
    )

    article7 = Article.create!(
      title: "This is a Demo Article!",
      body: "This is the article's body, where you can add more details about your article's subject or maybe even tell a story.",
      user_id: user1.id
    )
    article7.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/demo.jpeg"),
      filename: "demo.jpeg"
    )

    puts "Creating claps..."
    clap1 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user1.id
    )
    clap2 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user3.id
    )
    clap3 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user4.id
    )
    clap4 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user5.id
    )
    clap5 = Clap.create!(
      amount: 10,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user6.id
    )

    puts "Done!"
  # end