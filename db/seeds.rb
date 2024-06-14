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
    Follow.destroy_all
    Clap.destroy_all
    Article.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('articles')
    ApplicationRecord.connection.reset_pk_sequence!('claps')
    ApplicationRecord.connection.reset_pk_sequence!('follows')
  
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
      password: 'starwars'
    )
    user2.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/amin.png"),
      filename: "amin.png"
    )

    user3 = User.create!(
      name: 'Spencer Iascone',
      email: 'red_dwarf_fan@aa.io',
      password: 'starwars' 
    )
    user3.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/spencer.jpeg"),
      filename: "spencer.jpeg"
    )

    user4 = User.create!(
      name: 'Kyle Ginzburg',
      email: 'kginzburg@aa.io',
      password: 'starwars' 
    )
    user4.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/kyle.jpeg"),
      filename: "kyle.jpeg"
    )

    user5 = User.create!(
      name: 'Ayce Lacap',
      email: 'naur@aa.io',
      password: 'starwars'
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

    user7 = User.create!(
      name: 'Clarence Smith',
      email: 'ceo@writewise.com',
      password: 'starwars'
    )
    user7.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/clarence.jpeg"),
      filename: "clarence.jpeg"
    )

    user8 = User.create!(
      name: 'Kin Ka Tse',
      email: 'psycho-killer@aa.io',
      password: 'starwars'
    )
    user8.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/kinka.jpeg"),
      filename: "kinka.jpeg"
    )

    user9 = User.create!(
      name: 'Ash Hofferber',
      email: 'fluff-momma@hotmail.com',
      password: 'starwars'
    )
    user9.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/ash.jpg"),
      filename: "ash.jpg"
    )

    user10 = User.create!(
      name: 'Brendan Loftus',
      email: 'pickleball-boy@gmail.com',
      password: 'starwars'
    )
    user10.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/brendan.jpeg"),
      filename: "brendan.jpeg"
    )

    user11 = User.create!(
      name: 'Joe Masco',
      email: 'tatersalad@gmail.com',
      password: 'starwars'
    )
    user11.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/joe.jpeg"),
      filename: "joe.jpeg"
    )

    user12 = User.create!(
      name: 'Alice Johnson',
      email: 'alice.johnson@gmail.com',
      password: 'starwars'
    )
    user12.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/alice.jpeg"),
      filename: "alice.jpeg"
    )

    user13 = User.create!(
      name: 'Ed Davis',
      email: 'e.davis@gmail.com',
      password: 'starwars'
    )
    user13.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/ed.jpg"),
      filename: "ed.jpg"
    )

    user14 = User.create!(
      name: 'Mike Smith',
      email: 'michael.smith@gmail.com',
      password: 'starwars'
    )
    user14.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/users/mike.jpeg"),
      filename: "mike.jpeg"
    )

    # Article Seeds
    puts "Creating articles..."
    
    # Amin User 2 Articles
    article1 = Article.create!(
      title: "A Beginner's Guide to Kayaking Basics",
      body: "Embarking on the thrilling adventure of kayaking opens up a world of excitement and connection with nature. Whether you're paddling through calm waters or tackling challenging rapids, mastering the basics is crucial for a safe and enjoyable experience. In this guide, we'll explore the fundamental skills and knowledge every kayaker should possess to fully embrace the joys of kayaking.

      Before dipping your paddle into the water, it's essential to select the right kayak for your adventure. The type, size, and material of the kayak can significantly impact your paddling experience. For beginners, sit-on-top kayaks are highly recommended due to their stability and ease of entry and exit. These kayaks are user-friendly and ideal for warm weather conditions where getting wet is not an issue. On the other hand, sit-inside kayaks provide better protection from the elements, making them suitable for cooler climates or longer excursions where staying dry is preferable. Additionally, the material of the kayak, whether it's plastic, fiberglass, or composite, can affect its durability and performance. Carefully consider these factors to find the kayak that best suits your needs and the conditions you'll be paddling in.
      
      Proper paddling techniques form the foundation of a successful kayaking journey. The way you hold and maneuver your paddle greatly influences your efficiency and endurance on the water. To begin with, holding the paddle correctly is essential. Your hands should be about shoulder-width apart, with a relaxed grip to avoid fatigue. The power in your strokes should come from torso rotation rather than just your arms. This technique not only increases the power of your strokes but also reduces strain on your shoulders and arms.
      
      Mastering basic strokes such as the forward stroke, reverse stroke, and sweep stroke is critical. The forward stroke is the most common and propels the kayak forward. The reverse stroke is used for stopping and moving backward, while the sweep stroke allows for turning the kayak efficiently. Practicing these strokes will give you the control needed to navigate different water conditions confidently.
      
      Safety should always be a top priority when kayaking. Equipping yourself with essential safety gear is non-negotiable. A personal flotation device (PFD) is crucial for buoyancy and safety in case of an accidental capsize. A whistle is a simple yet effective tool for signaling for help if needed. Additionally, wearing appropriate clothing for the conditions, such as moisture-wicking fabrics in hot weather or dry suits in cold water, enhances comfort and safety.
      
      Understanding self-rescue techniques is another vital aspect of kayaking safety. One such technique is the Eskimo roll, which allows you to right your kayak without exiting it in the event of a capsize. Practicing self-rescue in controlled environments, such as calm waters or a pool, helps build confidence and proficiency, preparing you for more challenging conditions.
      
      Before setting out on your kayaking expedition, familiarize yourself with the waterway's layout and potential challenges. Planning your route involves considering factors like current speed, wind conditions, and any known obstacles or hazards. This preparation not only enhances your confidence on the water but also ensures a smoother and more enjoyable journey.
      
      Utilizing maps and local knowledge can provide valuable insights into the best routes and potential risks. Checking weather forecasts and water conditions before your trip can help you avoid dangerous situations and make informed decisions about when and where to paddle.
      
      Mastering the basics of kayaking is the key to unlocking the full potential of this thrilling water sport. Whether you're a novice or an experienced paddler, continuous learning and practice are essential for skill development and overall enjoyment. Taking kayaking classes, joining local paddling clubs, and participating in guided tours can provide valuable learning opportunities and enhance your skills.
      
      Regular practice not only improves your paddling techniques but also builds endurance and confidence. Exploring different water environments, from tranquil lakes to fast-moving rivers, helps you become a versatile paddler capable of handling various conditions.
      
      Kayaking offers a unique opportunity to connect with nature and experience the beauty of the great outdoors from a different perspective. The rhythmic motion of paddling, the serene surroundings, and the sense of accomplishment from navigating through water all contribute to a fulfilling experience. Whether you're seeking a peaceful escape or an adrenaline-pumping adventure, kayaking has something to offer.
      
      So, grab your paddle, don your PFD, and embark on a kayaking adventure that will leave you with lasting memories. Embrace the thrill of the journey, the joy of learning, and the beauty of nature as you explore the waterways. Kayaking is more than just a sport; it's an adventure that brings excitement, challenge, and a deep connection with the natural world.",
      user_id: user2.id,
      created_at: '2024-03-27 00:00:00',
      updated_at: '2024-03-27 00:00:00'
    )
    article1.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/kayak.jpeg"),
      filename: "kayak.jpeg"
    )
    article2 = Article.create!(
      title: "The Exciting Journey of Biking",
      body: "Embarking on the exciting journey of biking opens up a world of adventure and connection with nature. Whether you're cruising through city streets, tackling challenging mountain trails, or exploring scenic countryside routes, mastering the basics is crucial for a safe and enjoyable experience. In this guide, we'll explore the fundamental skills and knowledge every cyclist should possess to fully embrace the joys of biking.

      Before hitting the road or trail, selecting the right bike is essential for your biking adventure. The type of bike you choose should match the terrain and style of riding you plan to undertake. Road bikes are designed for smooth pavement and long-distance rides, offering speed and efficiency. Mountain bikes, with their sturdy frames and wide tires, are perfect for rugged trails and off-road adventures. Hybrid bikes combine features of both road and mountain bikes, making them versatile options for a variety of terrains.
      
      Consider the bike's frame size, which should match your height and leg length for optimal comfort and control. Additionally, the material of the bike, whether it's aluminum, steel, or carbon fiber, affects its weight and durability. Take the time to test ride different bikes to find the one that feels right for you.
      
      Proper riding techniques form the foundation of a successful biking journey. How you position yourself on the bike, pedal, and handle turns can significantly impact your efficiency and safety. To begin with, maintain a relaxed but firm grip on the handlebars, and ensure your saddle height is adjusted so that your leg is almost fully extended at the bottom of each pedal stroke.
      
      Mastering basic techniques such as starting and stopping smoothly, shifting gears efficiently, and maintaining balance is essential. When climbing hills, shift to a lower gear to make pedaling easier, and when descending, shift to a higher gear for better control. Practice braking gradually to avoid skidding and learn how to navigate turns by leaning your bike and using your body weight effectively.
      
      Safety should always be a top priority when biking. Equipping yourself with essential safety gear is crucial. A properly fitted helmet is the most important piece of safety equipment, protecting your head in case of a fall or collision. Additionally, wearing bright or reflective clothing increases your visibility to motorists and other cyclists.
      
      Ensure your bike is equipped with front and rear lights, especially if you plan to ride at dawn, dusk, or in low-light conditions. A bell or horn is useful for signaling your presence to pedestrians and other cyclists. Regularly check your bike’s brakes, tires, and chain to ensure they are in good working condition.
      
      Before setting out on your biking expedition, familiarize yourself with the route and potential challenges. Planning your route involves considering factors like traffic, road conditions, and elevation changes. Use maps and apps designed for cyclists to find bike-friendly routes and trails.
      
      Checking the weather forecast is also important to avoid unexpected rain or extreme temperatures. If you're biking in an unfamiliar area, bring a map or GPS device to stay on course. Having a plan in place will enhance your confidence and ensure a more enjoyable journey.
      
      Mastering the basics of biking is the key to unlocking the full potential of this exhilarating activity. Whether you're a novice or an experienced cyclist, continuous learning and practice are essential for skill development and overall enjoyment. Consider joining a local cycling club or taking biking classes to learn from experienced riders and gain valuable tips.
      
      Regular practice not only improves your riding techniques but also builds endurance and confidence. Explore different biking environments, from urban roads to mountain trails, to become a versatile cyclist capable of handling various conditions.
      
      Biking offers a unique opportunity to connect with nature and experience the beauty of the great outdoors from a different perspective. The rhythmic motion of pedaling, the wind in your face, and the sense of freedom from exploring new paths all contribute to a fulfilling experience. Whether you're seeking a peaceful escape or an adrenaline-pumping adventure, biking has something to offer.
      
      So, grab your helmet, hop on your bike, and embark on a biking adventure that will leave you with lasting memories. Embrace the thrill of the journey, the joy of learning, and the beauty of nature as you explore new routes. Biking is more than just a mode of transportation; it's an adventure that brings excitement, challenge, and a deep connection with the natural world.
      
      In conclusion, biking is a thrilling and rewarding activity that offers numerous benefits, from physical fitness to mental well-being. By choosing the right bike, understanding basic riding techniques, prioritizing safety, planning your route, and continuously learning and practicing, you can ensure a safe and enjoyable biking experience. Whether you're a casual rider or a seasoned cyclist, the adventure of biking awaits, promising new discoveries, challenges, and unforgettable moments. So, gear up and pedal your way to a world of excitement and connection with nature.",
      user_id: user2.id,
      created_at: '2024-04-02 00:00:00',
      updated_at: '2024-04-02 00:00:00'
    )
    article2.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/biking.jpeg"),
      filename: "biking.jpeg"
    )

    # Spencer User 3 Articles
    article3 = Article.create!(
      title: "The Cosmic Comedy Classic",
      body: "Red Dwarf, the British sci-fi sitcom, has carved its own niche in the world of television with its unique blend of humor, space adventures, and an eclectic mix of characters. In this short article, we'll explore the enduring appeal of this cult classic that has been entertaining audiences for decades.

      Red Dwarf takes viewers on a space odyssey like no other. Set aboard the mining spaceship Red Dwarf, the show follows the misadventures of the last human survivor, Dave Lister, his holographic companion Arnold Rimmer, the humanoid cat, and the neurotic mechanoid Kryten. The unlikely crew encounters bizarre phenomena, navigates through parallel universes, and stumbles upon the absurdities of deep space, creating a comedic backdrop for the series.
      
      At the heart of Red Dwarf is its unforgettable cast of characters. From the laid-back and curry-loving Lister to the uptight and eternally frustrated Rimmer, each character brings a distinct personality to the fore. The chemistry and banter among the crew contribute to the show's comedic brilliance, making it a beloved classic for fans of science fiction and comedy alike.
      
      Since its debut in 1988, Red Dwarf has continued to capture the imaginations of viewers with its wit, humor, and inventive storytelling. Despite its humble beginnings, the show has amassed a dedicated fanbase and stands as a testament to the enduring appeal of well-crafted science fiction comedy.
      
      Red Dwarf remains a shining star in the constellation of television classics, offering a delightful escape into the quirky and unpredictable world of deep space. Whether you're a longtime fan or a newcomer to the series, the cosmic escapades aboard the Red Dwarf are sure to leave you with a smile on your face and a fondness for the comedic charm that defines this beloved TV show.",
      user_id: user3.id,
      created_at: '2024-01-22 00:00:00',
      updated_at: '2024-01-22 00:00:00'
    )
    article3.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/red_dwarf.webp"),
      filename: "red_dwarf.webp"
    )
    article4 = Article.create!(
      title: "Essentials Knots for Climbers",
      body: "Rock climbing is an exhilarating and challenging sport that demands a high level of skill, strength, and safety awareness. One of the critical aspects of climbing safely is the ability to tie reliable knots. These knots secure the climber to the rope, attach gear to the rope, and ensure safety in various climbing situations. Mastering these knots is essential for any climber, whether they are a novice or an experienced alpinist. In this essay, we will explore the best knots used for rock climbing and their specific applications.

      The Figure Eight Knot, also known as the Figure Eight Follow-Through, is arguably the most essential knot for rock climbing. It is primarily used for tying the rope to the climber’s harness. This knot is favored for its simplicity, strength, and ease of inspection. To tie a Figure Eight Knot, you start by forming a loop and then threading the rope back through itself to create an eight-shaped figure. This knot is then followed through the harness loop and retraced to ensure it is securely tied. The Figure Eight Knot is highly reliable because it maintains its shape under tension and is easy to untie even after bearing a significant load.
      
      The Double Fisherman's Knot is another crucial knot used in rock climbing, particularly for tying two ropes together. This knot is known for its strength and reliability, making it ideal for creating a prusik loop or joining two ropes for a rappel. To tie a Double Fisherman's Knot, you wrap the end of one rope around the other rope twice and then back through the loops created. This process is repeated with the other rope end, resulting in a compact and secure knot. Its strength and compactness make it a favorite among climbers who need to ensure their ropes are securely joined.
      
      The Clove Hitch is a versatile knot used for securing a rope to a carabiner or an anchor. It is simple to tie and adjust, making it ideal for quickly attaching the rope during belaying or anchoring. To tie a Clove Hitch, you form two loops in the rope and then interlock them over a carabiner. This knot is particularly useful because it can be adjusted without untying, allowing climbers to modify the tension on the rope as needed. However, climbers should be cautious and back it up with a stopper knot to ensure it doesn’t slip under load.
      
      The Bowline Knot is a useful knot for creating a fixed loop at the end of a rope. It is often used to tie into the harness in scenarios where a Figure Eight Knot is less practical. The Bowline Knot is valued for its ease of tying and untying, even after bearing weight. To tie a Bowline Knot, you create a small loop near the rope's end, pass the rope end through the loop, around the standing part of the rope, and then back through the loop. It’s essential to secure the Bowline Knot with a backup knot, such as a Yosemite finish, to prevent it from coming undone under load.",
      user_id: user3.id,
      created_at: '2024-03-21 00:00:00',
      updated_at: '2024-03-21 00:00:00'
    )
    article4.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/knots.jpg"),
      filename: "knots.jpg"
    )

    # Kyle User 4 Articles
    article5 = Article.create!(
      title: "Miyazaki's Heron Song",
      body: "Hayao Miyazaki's latest film, The Boy and the Heron, may very well be his last. While the Studio Ghibli founder and master animator has declared his retirement multiple times in the past 20 years,The Boy and the Heron telegraphs the signs of the end and a bittersweet goodbye. This latest film may be his most personal and abstract work too.
      
      Set in Japan and framed by World War II, the story revolves around a young boy named Mahito, who is coming to terms with his mother's death while also learning to accept his new stepmother's love. Plot-wise, Mahito's growth is framed by a journey into a fantasy realm (complete with Miyazaki motifs and murderous birds - the “warawara” and parakeets steal the show), where he must rescue his stepmother. Many elements of this plot draw inspiration from actual events in Miyazaki's life, highlighting his reflective stance at this stage of his career.
      
      In this reflection, Miyazaki appears to have grown as well. While his films have often explored recurring themes of environmentalism, war, and death, Miyazaki has previously expressed cynical and misanthropic beliefs. This is the same man who once stated, “The future is clear. It’s going to fall apart. What’s the use in worrying? It’s inevitable.” However, The Boy and the Heron and its narrative exude much more optimism and acceptance, suggesting that Miyazaki has found peace with his career and faith in future generations to rectify past mistakes.
      
      In terms of the film's style, the animation is a true marvel. Miyazaki, an undying advocate for traditional hand-drawn animation, showcases the preciousness of this art style in The Boy and the Heron. As for the film's script, Mahito's journey into the fantasy realm is wondrous, but some aspects of that universe's laws bend to dream logic, which can be frustrating at times. If you approach the film with an open mind and are willing to indulge in Miyazaki's vision, he will offer an experience you won't forget.",
      user_id: user4.id,
      created_at: '2024-05-20 00:00:00',
      updated_at: '2024-05-20 00:00:00'
    )
    article5.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/heron.webp"),
      filename: "heron.webp"
    )
    article6 = Article.create!(
      title: "Did You See It Glow?",
      body: "Part intervention on how 90s children’s media helped form millennial identity, and another part allegory on the trans experience and dysphoria, “I Saw the TV Glow” is a remarkable horror movie. It relies less on traditional scares and more on general feelings of eeriness and unease. The film is even more impressive when considering that it's only Jane Schoenbrun’s sophomore directorial effort in narrative features. It’s not without some small issues though.

      Schoenbrun makes the absolute most from a production that fits somewhere in between micro budget and independent film. Their talents are revealed through their direction and ability to both engross and disturb with scenes that mostly consist of just two actors talking to each other. However, these lo-fi elements also betray Schoenbrun’s ambitions and the film suffers as a result.
      
      These lo-fi elements include sequences with little-to-no activity in the background and an embarrassing lack of extras. Some might argue that this was a conscious decision to further isolate Justice Smith’s character of Owen, but its effect is more hollow than helpful and a miscalculation.
      
      Schoenbrun’s lack of experience also reveals itself in some of the “Pink Opaque” segments. While “The Pink Opaque” is trying to imitate the cheesy style of children’s horror anthologies (think Nickelodeon’s “Are You Afraid of the Dark?”), some of these segments come off as too cheap. At the same time, some of the film’s recreations of that analog ‘90s aesthetic are perfect.
      
      Despite these minor inconsistencies, Schoenbrun has created something special here. There’s a “Pink Opaque” sequence near the film’s end that has stuck with me since I left the theater and I don’t think it’ll ever leave me; it’s found a nice spot to settle next to some old “Goosebumps” episodes (like “The Haunted Mask” or “Stay Out of the Basement”) that scarred me as a child.
      
      The story Schoenbrun has crafted is also strange and deeply affecting. It might take some cues from Lynch and Cronenberg when it blurs psychological and supernatural, but Schoenbrun leverages those weirder elements to explore the emotional distress that comes with dysphoria and the pursuit of one’s true self. This is where the film really stays.
      
      As for its cast, Brigette Lundy-Paine and Justice Smith are simply incredible in this film. Without their performances, “I Saw the TV Glow” would not be able to stand on its own as its power comes from the quiet isolation and pain of its two central characters. In fact, it’s difficult to think of anyone else playing these two characters as Maddy and Owen feel fully realized by Lundy-Paine and Smith respectively. 
      
      “I Saw the TV Glow” is one of the best films of 2024 so far. As a smaller A24 title, it might remain under the radar for most people. It’s sure to garner some recognition on the independent film awards circuit, but here’s hoping it draws and affects a wider audience.",
      user_id: user4.id,
      created_at: '2024-06-02 00:00:00',
      updated_at: '2024-06-02 00:00:00'
    )
    article6.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/tvglow.jpeg"),
      filename: "tvglow.jpeg"
    )

    # Ayce User 5 Articles
    article7 = Article.create!(
      title: "Fizz, Flavor, and Fermentation",
      body: "Kombucha, a fermented tea beverage, has taken the health and wellness scene by storm, becoming a popular choice for those seeking a flavorful and probiotic-rich drink. This ancient elixir is created through the fermentation of sweetened tea with a symbiotic culture of bacteria and yeast (SCOBY). As the fermentation process unfolds, the result is a fizzy, slightly tangy beverage with a myriad of potential health benefits.

      One of the primary attractions of kombucha is its rich probiotic content. Probiotics are beneficial bacteria that play a crucial role in maintaining a healthy gut microbiome. Regular consumption of probiotic-rich foods and drinks like kombucha is believed to support digestion, enhance nutrient absorption, and boost overall gut health. This makes kombucha a refreshing alternative to sugary sodas, which can have adverse effects on gut health.
      
      In addition to probiotics, kombucha is also packed with enzymes and antioxidants. Enzymes aid in digestion by breaking down food into nutrients that the body can easily absorb. Antioxidants, on the other hand, help combat oxidative stress and protect the body against free radicals, which can damage cells and contribute to various diseases. The presence of these beneficial compounds makes kombucha not only a tasty beverage but also a potentially health-promoting one.
      
      Kombucha’s appeal extends beyond its health benefits to its effervescent bubbles and diverse flavor profiles. The natural carbonation resulting from fermentation gives kombucha a delightful fizz that many find satisfying, especially as a healthier substitute for carbonated soft drinks. Moreover, kombucha can be flavored with a variety of fruits, herbs, and spices, resulting in a wide range of taste experiences. From fruity and floral to spicy and earthy, there is a kombucha flavor to suit nearly every palate.
      
      The immune-boosting properties of kombucha are another reason for its growing popularity. A healthy gut microbiome is closely linked to a robust immune system, as a significant portion of the immune system resides in the gut. By promoting gut health, kombucha indirectly supports immune function, helping the body fend off illnesses and infections.
      
      In conclusion, kombucha has become a beloved staple for those looking to marry taste with wellness. Its rich probiotic content, along with enzymes and antioxidants, supports gut health and overall well-being. The fizzy, flavorful nature of kombucha provides a refreshing and healthy alternative to sugary sodas, making it a go-to beverage for health-conscious individuals. Whether enjoyed for its potential health benefits or its diverse flavors, kombucha is a drink that embodies the best of both taste and wellness.",
      user_id: user5.id,
      created_at: '2024-05-05 00:00:00',
      updated_at: '2024-05-05 00:00:00'
    )
    article7.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/kombucha.jpeg"),
      filename: "kombucha.jpeg"
    )
    article8 = Article.create!(
      title: "The Smell of the Sun",
      body: "Sun Bum sunscreen, renowned for its protective qualities against harmful UV rays, has garnered attention for an unexpected application: as an effective deodorant. This unconventional use might surprise some, but it underscores the versatility of the product and highlights the innovative ways people are repurposing everyday items for enhanced personal care. This essay explores how Sun Bum sunscreen functions as a deodorant and why it has gained popularity in this role.

      Sun Bum sunscreen is formulated to protect the skin from the sun's harmful rays, primarily UVA and UVB radiation. It contains active ingredients like zinc oxide and titanium dioxide in mineral formulations, or avobenzone and octocrylene in chemical formulations, which either reflect or absorb UV rays to prevent skin damage. Additionally, Sun Bum sunscreens are enriched with moisturizing agents, antioxidants, and natural extracts, contributing to their skin-friendly properties. These ingredients not only protect the skin but also offer a soothing effect, reducing irritation and maintaining skin health.
      
      One of the reasons Sun Bum sunscreen can be effective as a deodorant is due to its antimicrobial properties. Deodorants work by neutralizing odor-causing bacteria rather than simply masking the odor. Many ingredients in Sun Bum sunscreen, such as zinc oxide, possess natural antimicrobial properties that inhibit the growth of bacteria responsible for body odor. By applying Sun Bum sunscreen under the arms, users can reduce the bacterial population in this area, thereby preventing the formation of unpleasant odors.
      
      Sun Bum sunscreen is known for its hydrating properties, which are beneficial when used as a deodorant. The underarm skin is particularly sensitive and prone to irritation from shaving and friction. The moisturizing agents in Sun Bum sunscreen, such as aloe vera and vitamin E, help to soothe and protect this delicate skin. Regular deodorants can sometimes cause dryness and irritation, but Sun Bum sunscreen's hydrating formula can prevent these issues, offering a gentler alternative that still provides effective odor control.
      
      Another advantage of using Sun Bum sunscreen as a deodorant is its long-lasting formula. Designed to withstand sweat and water, Sun Bum sunscreen remains effective even in hot and humid conditions. This durability makes it an excellent choice for those seeking a deodorant that can endure through strenuous activities and high temperatures. The same properties that keep the sunscreen from washing off easily also help it to remain effective in preventing odor throughout the day.
      
      Many users have turned to online platforms to share their positive experiences using Sun Bum sunscreen as a deodorant. These testimonials often highlight the product’s pleasant scent, effectiveness in preventing odor, and its gentleness on the skin. For individuals with sensitive skin or those who react poorly to traditional deodorants, Sun Bum sunscreen provides a viable and effective alternative. The growing number of positive reviews and recommendations adds credibility to the claim that Sun Bum sunscreen can double as an effective deodorant.
      
      The use of Sun Bum sunscreen as a deodorant also speaks to a broader trend in personal care: the desire for multifunctional products. Consumers increasingly seek out items that can serve multiple purposes, reducing the number of products they need to purchase and simplifying their routines. Sun Bum sunscreen, with its dual functionality, fits perfectly into this trend, offering both sun protection and odor prevention in one product.
      
      In conclusion, Sun Bum sunscreen has proven to be an effective deodorant for many users, thanks to its antimicrobial properties, moisturizing benefits, and long-lasting formula. Its ability to neutralize odor-causing bacteria, soothe sensitive skin, and remain effective in various conditions makes it a versatile and valuable addition to personal care routines. While it may not have been the intended use, the innovative application of Sun Bum sunscreen as a deodorant highlights the adaptability and multifunctionality of modern personal care products. This unexpected benefit not only enhances its appeal but also demonstrates the creative ways in which consumers are reimagining everyday items to meet their needs.",
      user_id: user5.id,
      created_at: '2024-04-07 00:00:00',
      updated_at: '2024-04-07 00:00:00'
    )
    article8.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/sunbum.jpeg"),
      filename: "sunbum.jpeg"
    )

    # Stephen User 6 Articles
    article9 = Article.create!(
      title: "The Thing about Analogue Watch Construction is...",
      body: "Crafting an analogue watch is a meticulous process that combines precision engineering with timeless craftsmanship. Each watch is a masterpiece, a symphony of intricate gears, springs, and wheels working together seamlessly to measure the passage of time. This detailed process, executed by skilled watchmakers, results in a functional work of art that stands the test of time.

      The heart of an analogue watch lies in its mechanical movement, a complex mechanism where tiny cogs and levers create the mesmerizing dance of the watch hands. This movement is the core of the watch's operation, converting the energy stored in the mainspring into the consistent, controlled motion of the hands. The creation of this movement requires extreme precision. Gears must be cut with exacting accuracy, and each component must fit together perfectly to ensure the smooth operation of the timepiece.
      
      Skilled watchmakers assemble these timepieces with meticulous attention to detail, carefully placing each component by hand. This level of craftsmanship demands a deep understanding of both the art and science of watchmaking. Every tiny part, from the balance wheel to the escapement, must be handled with care and precision. The balance wheel, often referred to as the heart of the watch, oscillates back and forth, regulating the release of energy from the mainspring. This regulation is crucial for maintaining the watch's accuracy over time.
      
      The escapement mechanism is another critical component, controlling the release of energy to the gear train. This mechanism ensures that the gear train advances at a consistent rate, driving the hands of the watch forward in regular intervals. The interaction between the escapement and the gear train creates the characteristic ticking sound of an analogue watch, a rhythmic reminder of the watch's intricate inner workings.
      
      Beyond the internal mechanisms, the exterior of the watch also showcases the dedication and skill of the artisans who create these timepieces. The watch case, often made from high-quality materials such as stainless steel, gold, or platinum, must be meticulously polished and finished to enhance its durability and aesthetic appeal. The dial, hands, and markers are carefully designed and placed to ensure both functionality and elegance.
      
      The construction of an analogue watch is a testament to the dedication of artisans who uphold the tradition of watchmaking. This tradition dates back centuries and has been passed down through generations of watchmakers. Each watch represents countless hours of painstaking work and an unwavering commitment to excellence. The result is a timepiece that not only measures time but also tells a story of craftsmanship and tradition.
      
      In an age where digital technology dominates, the analogue watch stands as a symbol of enduring quality and artistry. Its mechanical movement, visible through the case back of many watches, continues to fascinate and captivate watch enthusiasts around the world. The craftsmanship involved in creating these timepieces is a celebration of human ingenuity and dedication to the art of watchmaking.
      
      In conclusion, the art of crafting an analogue watch is a process that demands precision, patience, and a deep respect for tradition. From the precision-cut gears to the polished watch case, every aspect of the watch is a testament to the skill and dedication of the watchmakers. These timepieces are more than just instruments for measuring time; they are functional works of art that embody the legacy of centuries of watchmaking tradition. As such, they continue to be cherished by those who appreciate the blend of engineering and artistry that defines the analogue watch.",
      user_id: user6.id,
      created_at: '2024-01-03 00:00:00',
      updated_at: '2024-01-03 00:00:00'
    )
    article9.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/watch.jpeg"),
      filename: "watch.jpeg"
    )

    article10 = Article.create!(
      title: "Wine and Dine",
      body: "Carbone, a restaurant renowned for its vibrant atmosphere and exquisite Italian-American cuisine, stands as a testament to the enduring appeal of classic dining experiences. Nestled in the heart of New York City's Greenwich Village, Carbone transports its guests to a bygone era, offering a dining experience that is both nostalgic and sophisticated. From its meticulously crafted dishes to its impeccable service, Carbone delivers on all fronts, making it a must-visit destination for food enthusiasts and aficionados of fine dining.

      Stepping into Carbone is akin to stepping back in time. The restaurant's decor pays homage to the mid-20th century, with its dark wood paneling, white tablecloths, and checkered floors. Vintage photographs and artwork adorn the walls, contributing to the old-world charm that permeates the space. The dim lighting and plush leather banquettes create an intimate setting, perfect for a romantic dinner or a special celebration. The ambiance is enhanced by the attentive staff, who are dressed in tuxedos and exhibit a level of professionalism and warmth that is increasingly rare in modern dining establishments.
      
      The service at Carbone is nothing short of exemplary. From the moment you are greeted by the maître d' to the final farewell, every aspect of the dining experience is meticulously orchestrated. The waitstaff are knowledgeable, attentive, and personable, providing detailed descriptions of the menu items and offering recommendations based on your preferences. The attention to detail is evident in every interaction, whether it's the timely refilling of water glasses or the unobtrusive clearing of plates. The staff's dedication to creating a memorable dining experience is a cornerstone of Carbone's reputation for excellence.
      
      Carbone's menu is a celebration of classic Italian-American dishes, executed with finesse and flair. The culinary team, led by chefs Mario Carbone and Rich Torrisi, has crafted a selection of offerings that pay homage to traditional recipes while incorporating contemporary touches. The menu features a range of appetizers, pastas, and entrees, each prepared with high-quality ingredients and expert technique.
      
      The appetizers set the tone for the meal, with standout dishes like the Spicy Rigatoni Vodka and the Caesar Salad prepared tableside. The Spicy Rigatoni Vodka is a crowd favorite, boasting perfectly cooked pasta enveloped in a creamy, tangy sauce with just the right amount of heat. The tableside preparation of the Caesar Salad adds a touch of theatrics to the dining experience, with the fresh, crisp greens and rich, anchovy-forward dressing making for a delightful start to the meal.
      
      Carbone's entrees continue the tradition of excellence, with options like the Veal Parmesan, Lobster Fra Diavolo, and Prime Rib carving station. The Veal Parmesan is a showstopper, featuring a generous portion of tender, breaded veal topped with melted mozzarella and a vibrant tomato sauce. The Lobster Fra Diavolo offers a spicy, seafood-laden feast, while the Prime Rib, carved to order, showcases the kitchen's prowess with meats.
      
      No meal at Carbone is complete without indulging in their decadent desserts. The Tiramisu, served in a glass jar, is light and airy with layers of coffee-soaked ladyfingers and mascarpone cream. The Lemon Cheesecake is another standout, offering a refreshing and tangy end to the meal.
      
      Carbone's wine list is extensive and thoughtfully curated, featuring a selection of Italian and American wines that complement the menu perfectly. The sommelier is on hand to guide guests through the options, ensuring each pairing enhances the dining experience. The cocktail program is equally impressive, with classic concoctions and modern creations that add to the overall enjoyment of the meal.
      
      Carbone excels in delivering a dining experience that is both nostalgic and contemporary. The combination of impeccable service, a meticulously crafted menu, and an inviting atmosphere makes it a standout in New York City's competitive dining scene. Whether you're a local or a visitor, dining at Carbone is an opportunity to indulge in culinary excellence and timeless elegance. It is a restaurant that not only lives up to its reputation but exceeds expectations, ensuring that each visit is a memorable one.",
      user_id: user6.id,
      created_at: '2024-02-14 00:00:00',
      updated_at: '2024-02-14 00:00:00'
    )
    article10.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/carbone.jpeg"),
      filename: "carbone.jpeg"
    )

    # Kyle User 4 Article
    article11 = Article.create!(
      title: "Ruby vs. JavaScript: My Two Favorite Languages",
      body: "Ruby and JavaScript are two prominent programming languages that cater to different domains and serve distinct purposes in the world of software development. While both languages have their strengths and applications, they exhibit notable differences in syntax, paradigms, ecosystems, and use cases. This comparison aims to highlight these differences and provide insights into when each language might be preferred.

      Ruby is renowned for its elegant and readable syntax, often described as a fun language due to its simplicity and expressiveness. Inspired by Perl and Smalltalk, Ruby emphasizes readable code and follows the principle of least surprise, aiming to minimize unexpected behavior. It features dynamic typing and object-oriented programming (OOP) paradigms, with a focus on developer productivity and code readability.
      
      JavaScript, on the other hand, is a versatile language primarily used for client-side scripting in web development. It is known for its C-like syntax and its prototypal inheritance model. Initially designed to add interactivity to web pages, JavaScript has evolved into a multipurpose language used for both front-end and back-end development. Its syntax has evolved over time, with modern JavaScript (ES6 and beyond) introducing features like arrow functions, classes, and modules, enhancing its expressiveness and maintainability.
      
      Ruby promotes a pure OOP approach, where everything is an object and methods are invoked on objects. It supports metaprogramming, allowing developers to write code that can modify itself at runtime, leading to powerful abstractions and DSLs (Domain-Specific Languages). Ruby’s focus on flexibility and convention over configuration (CoC) has made it popular for web development frameworks like Ruby on Rails, which emphasize convention and productivity.
      
      JavaScript, while also supporting OOP, incorporates functional programming (FP) concepts such as higher-order functions, closures, and immutability. This flexibility enables developers to choose between different paradigms based on the problem domain and scalability requirements. Modern JavaScript frameworks/libraries like React and Node.js have popularized functional programming patterns, encouraging developers to write declarative, composable code that can be easier to reason about and test.
      
      Ruby benefits from its vibrant community and ecosystem, centered around the RubyGems package manager. RubyGems hosts thousands of libraries and frameworks, with Ruby on Rails being one of the most influential web frameworks globally. Rails provides robust conventions, automated testing, and powerful abstractions that accelerate web application development.
      
      JavaScript’s ecosystem is vast and diverse, bolstered by npm (Node Package Manager), which hosts millions of packages ranging from front-end frameworks (e.g., React, Angular, Vue.js) to back-end frameworks (e.g., Express.js, Nest.js). The Node.js runtime enables JavaScript to be used for server-side development, facilitating full-stack JavaScript applications. This versatility has contributed to JavaScript’s dominance in web development and its widespread adoption in other domains like mobile app development (React Native) and desktop applications (Electron).
      
      Ruby historically has been criticized for its performance compared to statically typed languages like Java or C++. However, advancements like the Ruby 3x3 initiative and Just-In-Time (JIT) compilers have significantly improved its speed and memory usage. Ruby’s focus on developer happiness often prioritizes ease of use and productivity over raw performance.
      
      JavaScript’s performance has also evolved with optimizations in JavaScript engines like V8 (used in Chrome and Node.js). Just-In-Time compilation, asynchronous programming models (promises, async/await), and worker threads have enhanced JavaScript’s ability to handle complex computations and concurrent tasks efficiently. This makes JavaScript suitable for both high-performance web applications and server-side applications requiring scalability.
      
      Overall, Ruby and JavaScript cater to different programming needs and paradigms. Ruby excels in developer happiness, expressiveness, and productivity, making it ideal for rapid prototyping and web development using frameworks like Ruby on Rails. JavaScript, with its versatility, extensive ecosystem, and performance optimizations, dominates the web development landscape, supporting both front-end and back-end development across a wide range of applications.
      
      Choosing between Ruby and JavaScript often depends on factors like project requirements, team expertise, and scalability needs. Both languages have thriving communities, robust tooling, and frameworks that continue to evolve, ensuring they remain relevant choices for developers navigating the ever-changing landscape of software development. By using them together though, you can build some pretty cool applications.",
      user_id: user4.id,
      created_at: '2024-01-15 00:00:00',
      updated_at: '2024-01-15 00:00:00'
    )
    article11.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/language.png"),
      filename: "language.png"
    )

    # Demo User Article
    article12 = Article.create!(
      title: "This is a Demo Article!",
      body: "This is the article's body, where you can add more details about your article's subject or maybe even tell a story. You could even edit this article's title, body, or photo if you were its author.",
      user_id: user1.id,
    )
    article12.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/demo.jpeg"),
      filename: "demo.jpeg"
    )

    # Clarence User 7 Articles
    article13 = Article.create!(
      title: "War Never Changes, but Fallout 3 Does!",
      body: "Fallout 3, a critically acclaimed action role-playing game developed by Bethesda Game Studios, immerses players in a post-apocalyptic world filled with rich storytelling, open-world exploration, and moral dilemmas. Released in 2008, Fallout 3 quickly became a landmark title in the RPG genre, known not only for its compelling narrative but also for its exceptional replayability, offering players endless possibilities and choices that shape their unique journey through the wasteland.

      Fallout 3's replayability stems from its expansive and dynamic open-world environment. Set in a retro-futuristic version of Washington, D.C., known as the Capital Wasteland, the game invites players to explore a vast and varied landscape teeming with hidden treasures, dangerous mutants, and remnants of pre-war civilization. Each playthrough can uncover new locations, quests, and encounters, encouraging players to traverse the wasteland in different ways and discover alternative paths to their objectives.
      
      Central to Fallout 3's replayability is its emphasis on player choice and consequence. From the outset, players define their character's background, skills, and moral alignment, influencing interactions with NPCs and factions throughout the game. The branching narrative allows for multiple quest resolutions and endings based on these choices, fostering a sense of agency and personalization in each playthrough. Whether siding with the altruistic Brotherhood of Steel or the morally ambiguous Raiders, players experience divergent storylines and outcomes that encourage subsequent replays to explore alternative paths.
      
      Fallout 3 offers robust character customization and role-playing depth, further enhancing its replayability. Players can allocate skill points, choose perks, and specialize in various combat styles (such as melee, small guns, or energy weapons), influencing their approach to combat and problem-solving. The S.P.E.C.I.A.L. system (Strength, Perception, Endurance, Charisma, Intelligence, Agility, and Luck) allows for diverse character builds, each offering unique strengths and weaknesses that impact gameplay and dialogue options. Experimenting with different character builds and playstyles encourages replayability as players strive to uncover new strategies and experiences.
      
      The Capital Wasteland is rife with hidden secrets, side quests, and random encounters that reward exploration and curiosity. From abandoned vaults and dilapidated buildings to irradiated ruins and underground tunnels, every corner of Fallout 3's world holds potential surprises and challenges. The game's non-linear structure and freedom to roam encourage players to revisit areas, uncover missed details, and uncover new stories with each playthrough.
      
      Fallout 3's longevity and replayability are further bolstered by its active modding community. Modders have created thousands of user-generated modifications that range from graphical enhancements and gameplay tweaks to entirely new quests and companions. These mods expand the game's content, introduce fresh gameplay mechanics, and provide new ways to experience the wasteland, prolonging its appeal and offering new challenges and adventures for both veteran and new players alike.
      
      In the end, Fallout 3 continues to captivate players with its immersive world, compelling narratives, and unparalleled replayability. Its dynamic open-world design, emphasis on player choice and consequence, deep character customization, and endless opportunities for exploration ensure that each playthrough offers a unique and engaging experience. Whether embarking on a quest for justice, power, or survival, Fallout 3 invites players to shape their own stories in the aftermath of nuclear devastation, making it a timeless classic in the realm of role-playing games.",
      user_id: user7.id,
      created_at: '2024-03-13 00:00:00',
      updated_at: '2024-03-13 00:00:00'
    )
    article13.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/fallout.jpeg"),
      filename: "fallout.jpeg"
    )
    article14 = Article.create!(
      title: "The Rivers of Babylon",
      body: "Babylon.js is a powerful JavaScript framework designed for building interactive 3D applications and games directly within web browsers. Developed by the Babylon.js team at Microsoft, this open-source framework empowers developers to create immersive experiences using WebGL, WebXR, and other web standards.

      At the core of Babylon.js is the concept of a scene, which serves as the container for all 3D objects, lights, cameras, and other elements in your application. To create a scene, developers initialize a new instance of the BABYLON.Scene class and configure its properties such as background color, ambient lighting, and gravity. Scenes in Babylon.js can be dynamic, allowing for real-time updates and interactions with objects.
      
      In Babylon.js, meshes are fundamental objects that represent 3D models or shapes within the scene. Meshes can be simple primitives like spheres, boxes, and planes, or complex imported models from external files. Developers can manipulate meshes by scaling, rotating, and translating them in 3D space. Materials define the visual appearance of meshes, controlling properties like color, texture, reflectivity, and transparency.
      
      Babylon.js provides different camera types, such as BABYLON.FreeCamera and BABYLON.ArcRotateCamera, to define the viewpoint and perspective of the scene. Cameras can be positioned and oriented to achieve specific views of the 3D environment. Interactivity is achieved through user input and event handling. Babylon.js supports mouse and touch interactions for navigation, as well as keyboard controls for object manipulation and scene navigation.
      
      Lighting plays a crucial role in creating realistic 3D scenes. Babylon.js supports various types of lights, including directional lights, point lights, spotlights, and hemispheric lights. These lights illuminate objects in the scene, casting shadows and enhancing visual depth. Developers can adjust light properties such as intensity, color, and shadow quality to achieve desired lighting effects.
      
      Physics simulation in Babylon.js enables realistic interactions between objects in the scene. The framework integrates with popular physics engines like Cannon.js and Oimo.js to handle collisions, gravity, and other physical forces. Animation is achieved through keyframe animation or procedural animation techniques, allowing developers to create dynamic movements and transformations of objects over time.
      
      Babylon.js supports importing 3D models and scenes from popular formats like .obj, .glb, and .gltf. External tools such as Blender, 3ds Max, and Unity can be used to create and export assets for use in Babylon.js applications. The framework's flexibility and compatibility facilitate seamless integration with existing workflows and pipelines for 3D content creation.
      
      In conclusion, Babylon.js empowers developers to leverage the capabilities of WebGL and WebXR to create stunning 3D applications and games directly within web browsers. With its comprehensive set of features for scene management, mesh manipulation, materials, lighting, physics, and animation, Babylon.js provides a robust framework for building immersive and interactive web experiences. Whether you're a beginner exploring 3D web development or an experienced developer seeking to push the boundaries of web-based 3D graphics, Babylon.js offers the tools and flexibility to bring your vision to life on the web platform.",
      user_id: user7.id,
      created_at: '2024-06-03 00:00:00',
      updated_at: '2024-06-03 00:00:00'
    )
    article14.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/babylon.jpeg"),
      filename: "babylon.jpeg"
    )

    # Kin Ka User 8 Articles
    article15 = Article.create!(
      title: "My Very Own String Theory",
      body: "Tennis, a sport renowned for its elegance, athleticism, and strategic depth, captivates players and spectators alike with its blend of skill, finesse, and competitive spirit. Originating in 19th-century England, tennis has evolved into a global phenomenon with a rich history and a passionate following. Here's an exploration of the enduring appeal and dynamics of tennis:

      Tennis traces its origins to medieval ball games played in Europe, gradually evolving into the modern sport we know today. The establishment of standardized rules and the invention of lawn tennis in the 19th century propelled tennis into mainstream popularity. Tournaments like Wimbledon, the French Open, the US Open, and the Australian Open have become prestigious events that showcase the sport's elite talent and tradition.
      
      Tennis is played on a rectangular court divided into two halves by a net. Players use rackets to strike a felt-covered rubber ball over the net into the opponent's court. The objective is to score points by hitting the ball in such a way that the opponent cannot return it within the boundaries of the court. Matches are typically played in singles (one player per side) or doubles (two players per side) formats, with a scoring system that includes sets and games.
      
      Success in tennis demands a combination of physical agility, mental acuity, and technical proficiency. Players must master a variety of strokes, including the forehand, backhand, serve, volley, and overhead smash. Each stroke requires precise timing, footwork, and racket control to generate power, spin, and accuracy. Strategy plays a crucial role, as players analyze opponents' weaknesses, anticipate shot placement, and adapt tactics throughout the match.
      
      The pinnacle of competitive tennis is the Grand Slam tournaments, comprising the Australian Open, French Open, Wimbledon, and the US Open. These events attract top-ranked players from around the world, competing for coveted titles and substantial prize money. The Grand Slam tournaments are known for their tradition, prestige, and unique playing surfaces (hard court, clay court, and grass court), each presenting distinct challenges and strategies.
      
      Tennis is a physically demanding sport that requires cardiovascular fitness, agility, strength, and stamina. Matches can last several hours, testing players' endurance and mental fortitude. Training regimens focus on speed, flexibility, explosive power, and recovery to withstand the rigors of competitive play and prevent injuries.
      
      Tennis enjoys widespread popularity globally, attracting millions of recreational players and spectators of all ages. The sport's appeal transcends borders and cultures, with professional players from diverse backgrounds becoming household names. Icons like Roger Federer, Serena Williams, Rafael Nadal, and Naomi Osaka have inspired generations with their athleticism, sportsmanship, and contributions to the sport's legacy.
      
      Tennis continues to thrive as a sport that embodies athleticism, strategy, and passion. From its origins on grass courts to its modern-day prominence on diverse surfaces and global stages, tennis remains a symbol of grace under pressure and the pursuit of excellence. Whether played competitively or casually, tennis offers participants and fans alike a thrilling display of skill, strategy, and sportsmanship that transcends generations and cultures. As the sport evolves with technological advancements and shifts in playing styles, its timeless appeal and dynamic nature ensure that tennis will continue to captivate audiences and inspire future generations of athletes around the world.",
      user_id: user8.id,
      created_at: '2024-05-19 00:00:00',
      updated_at: '2024-05-19 00:00:00'
    )
    article15.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/tennis.jpeg"),
      filename: "tennis.jpeg"
    )

    # Ash User 9 Articles
    article16 = Article.create!(
      title: "Pomeranians: More than Meets the Eye",
      body: "Pomeranians, often affectionately referred to as Poms, are small dogs with big personalities. Despite their diminutive size, these fluffy companions pack a lot of charm, intelligence, and energy into their petite frames. Here’s a closer look at what makes Pomeranians stand out as beloved pets and companions:

      Pomeranians are a toy breed known for their tiny stature and abundant fur. They typically weigh between 3 to 7 pounds and stand around 6 to 7 inches tall at the shoulder. Their coat comes in a variety of colors, including white, black, orange, cream, and more, often with distinctive markings and patterns. While their fluffy appearance might suggest high maintenance grooming, regular brushing and occasional grooming appointments keep their coats healthy and manageable.
      
      Don’t let their size fool you—Pomeranians are bold, confident, and spirited dogs. They are known for their extroverted personalities and boundless energy, making them excellent companions for active individuals or families. Poms are intelligent and eager to please, often excelling in training with positive reinforcement techniques. They are affectionate towards their owners and enjoy being the center of attention, thriving in environments where they receive love and social interaction.
      
      Despite their small size, Pomeranians are surprisingly active and require regular exercise to maintain their physical and mental well-being. Daily walks, playtime, and interactive toys help fulfill their exercise needs. Due to their thick double coat, they are sensitive to heat, so care should be taken to avoid prolonged exposure to hot temperatures. Proper dental care and a balanced diet are also essential for their overall health and longevity.
      
      Pomeranians are adaptable to various living situations, whether in an apartment or a house with a yard, as long as they receive adequate exercise and mental stimulation. They enjoy being part of family activities and thrive on positive interaction with their owners. Poms can also excel in dog sports such as agility and obedience, showcasing their agility and intelligence.
      
      On average, Pomeranians have a lifespan of 12 to 16 years, provided they receive proper care and nutrition. Like all breeds, they are prone to certain health conditions such as dental issues, luxating patella (knee cap displacement), and tracheal collapse. Regular veterinary check-ups, vaccinations, and preventive care help ensure their well-being throughout their lives.
      
      Pomeranians are much more than their fluffy appearance suggests. They are spirited, intelligent, and affectionate companions that bring joy and entertainment to their families. Whether delighting in playtime antics or cuddling up for a nap, Pomeranians exemplify the adage that good things come in small packages. Their lively personalities and loyal nature make them cherished pets that leave a lasting paw print on the hearts of those who have the pleasure of sharing their lives with these wonderful dogs.",
      user_id: user9.id,
      created_at: '2024-02-20 00:00:00',
      updated_at: '2024-02-20 00:00:00'
    )
    article16.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/pomeranian.jpg"),
      filename: "pomeranian.jpg"
    )

    # Brendan User 10 Articles
    article17 = Article.create!(
      title: "Pickleball is Pickleback: Rules of the Game",
      body: "Pickleball is a fast-paced paddle sport that combines elements of tennis, badminton, and table tennis. It is played on a court with specific dimensions, using paddles and a plastic ball with holes (similar to a wiffle ball). Here's a breakdown of the basic rules of pickleball:

      Pickleball is played on a badminton-sized court (20 feet wide and 44 feet long) with a net lowered to 36 inches at the center. The court is divided into two halves by a centerline and includes service courts on each side. Players use solid paddles made of wood, composite materials, or graphite to hit a perforated plastic ball over the net.
      
      The game begins with one team serving the ball diagonally to the opponent's service court. The serve must be underhand and made below waist level. The server must stand behind the baseline and hit the ball into the opponent's diagonal service court. The serve is not allowed to touch the net (let serve) and must land within the confines of the service court.
      
      After the serve, both teams (doubles or singles) volley the ball back and forth until a fault occurs. A fault can occur if the ball is hit out of bounds, fails to clear the net, or if a player commits a rule violation (such as stepping into the non-volley zone while volleying). Points are scored only by the serving team. The first side to reach 11 points (winning by at least 2 points) wins the game.
      
      A key rule in pickleball is the non-volley zone, also known as the kitchen. This zone extends 7 feet from the net on both sides and prevents players from volleying the ball while standing inside it. Players can enter the kitchen to play a ball that has bounced, but they must exit before volleying the ball back over the net.
      
      Another fundamental rule in pickleball is the double bounce rule. This rule requires that the ball must bounce once on each side of the net at the beginning of each point (serve and return). After the two bounces, players can either volley the ball before it bounces or allow it to bounce once before returning it.
      
      In doubles play, both players on a team serve consecutively until a fault is committed. After losing the serve, the opposing team serves, and the cycle continues. The serving team alternates sides with each serve won until the game is completed.
      
      Pickleball is a versatile and engaging sport suitable for players of all ages and skill levels. Its simple rules and compact court size make it accessible, while its strategic depth and fast-paced nature provide excitement and challenge for competitive players. Whether played for recreation or in organized tournaments, pickleball fosters teamwork, agility, and sportsmanship among participants, making it a popular choice in recreational sports communities worldwide.",
      user_id: user10.id,
      created_at: '2024-04-06 00:00:00',
      updated_at: '2024-04-06 00:00:00'
    )
    article17.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/pickleball.jpeg"),
      filename: "pickleball.jpeg"
    )

    # Joe User 11 Articles
    article18 = Article.create!(
      title: "Where Strategy Meets Splendor",
      body: "Scythe, a board game masterpiece designed by Jamey Stegmaier and published by Stonemaier Games, stands as a beacon of strategic depth, immersive storytelling, and stunning artistry. Set in an alternate-history 1920s Eastern Europe, Scythe combines elements of resource management, area control, and asymmetric player powers into a seamless and captivating experience. Here’s why Scythe deserves its accolades and why it continues to captivate board gamers worldwide.

      From the moment players lay eyes on Scythe, they are drawn into its visually breathtaking world. The game board, illustrated by Jakub Rozalski, features sweeping landscapes, towering mechs, and intricate details that evoke a sense of wonder and nostalgia. Each faction's miniatures and character boards are meticulously designed, reflecting their unique abilities and personalities. The art direction in Scythe not only enhances gameplay but also immerses players in a rich narrative where every action feels consequential.
      
      Scythe offers unparalleled replayability through its asymmetric factions and open-ended strategies. Players choose from factions like the militaristic Rusviet Union, the industrious Saxony, or the enigmatic Crimean Khanate, each with distinct strengths, weaknesses, and play styles. The game encourages players to explore different strategies, from aggressive expansion and combat to peaceful economic development and cultural influence. The choices made throughout the game impact not only immediate tactical outcomes but also long-term strategic advantages.
      
      At its core, Scythe is a game of strategic planning and resource management. Players deploy workers to gather resources such as wood, metal, oil, and food, which are essential for building structures, upgrading abilities, and recruiting mechs. Balancing resource acquisition with efficient deployment of actions becomes crucial as players vie for control over territories, encounter encounters, and prepare for endgame objectives. The depth of strategy in Scythe ensures that each playthrough is a dynamic and engaging puzzle to solve.
      
      Beyond its mechanics, Scythe weaves a narrative tapestry that evolves with each game session. The game's encounters, events, and player interactions create emergent stories of conquest, diplomacy, and intrigue. Players forge alliances, negotiate trade agreements, and navigate the consequences of their decisions in a world shaped by competing ideologies and ambitions. The narrative depth of Scythe elevates it from a mere strategy game to a compelling saga where players become architects of their own destinies.
      
      Scythe has fostered a vibrant and passionate community of players who share strategies, discuss tactics, and celebrate their gaming experiences. Tournaments, conventions, and online forums abound with discussions about optimal faction pairings, memorable victories, and epic moments of triumph and defeat. The game's accessibility, coupled with its depth, has made it a staple in the board gaming community, where it continues to inspire creativity and camaraderie among players of all ages and backgrounds.
      
      Scythe transcends the boundaries of traditional board games with its blend of strategic complexity, thematic immersion, and artistic excellence. It invites players to embark on a journey of exploration and conquest in a beautifully realized world where every decision carries weight and consequence. Whether you're drawn to its stunning visuals, strategic depth, or narrative richness, Scythe stands as a testament to the power of board games to inspire, challenge, and entertain. As players gather around the table to engage in the epic struggles of 1920s Eastern Europe, they discover not only a game but a shared experience that leaves a lasting impression on the heart and mind.",
      user_id: user11.id,
      created_at: '2024-1-25 00:00:00',
      updated_at: '2024-1-25 00:00:00'
    )
    article18.photo.attach(
      io: URI.open("https://centre-seeds.s3.amazonaws.com/articles/scythe.jpg"),
      filename: "scythe.jpg"
    )

    # Clap Seeds
    puts "Creating claps..."

    # Article 1 Claps
    clap1 = Clap.create!(
      amount: 5,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user4.id
    )
    clap2 = Clap.create!(
      amount: 10,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user5.id
    )
    clap3 = Clap.create!(
      amount: 3,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user6.id
    )
    clap4 = Clap.create!(
      amount: 2,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user7.id
    )
    clap5 = Clap.create!(
      amount: 13,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user8.id
    )

    # Article 2 Claps
    clap6 = Clap.create!(
      amount: 3,
      clappable_type: "Article",
      clappable_id: article2.id,
      clapper_id: user4.id
    )
    clap7 = Clap.create!(
      amount: 10,
      clappable_type: "Article",
      clappable_id: article2.id,
      clapper_id: user5.id
    )
    clap8 = Clap.create!(
      amount: 7,
      clappable_type: "Article",
      clappable_id: article2.id,
      clapper_id: user6.id
    )

    # Article 3 Claps
    clap9 = Clap.create!(
      amount: 50,
      clappable_type: "Article",
      clappable_id: article3.id,
      clapper_id: user4.id
    )

    # Article 4 Claps
    clap10 = Clap.create!(
      amount: 6,
      clappable_type: "Article",
      clappable_id: article4.id,
      clapper_id: user2.id
    )
    clap11 = Clap.create!(
      amount: 12,
      clappable_type: "Article",
      clappable_id: article4.id,
      clapper_id: user5.id
    )

    # Article 5 Claps
    clap12 = Clap.create!(
      amount: 11,
      clappable_type: "Article",
      clappable_id: article5.id,
      clapper_id: user3.id
    )
    clap13 = Clap.create!(
      amount: 4,
      clappable_type: "Article",
      clappable_id: article5.id,
      clapper_id: user5.id
    )

    # Article 6 Claps
    clap14 = Clap.create!(
      amount: 4,
      clappable_type: "Article",
      clappable_id: article6.id,
      clapper_id: user3.id
    )
    clap15 = Clap.create!(
      amount: 7,
      clappable_type: "Article",
      clappable_id: article6.id,
      clapper_id: user5.id
    )

    # Article 7 Claps
    clap16 = Clap.create!(
      amount: 3,
      clappable_type: "Article",
      clappable_id: article7.id,
      clapper_id: user3.id
    )
    clap17 = Clap.create!(
      amount: 4,
      clappable_type: "Article",
      clappable_id: article7.id,
      clapper_id: user4.id
    )

    # Article 8 Claps
    clap18 = Clap.create!(
      amount: 4,
      clappable_type: "Article",
      clappable_id: article8.id,
      clapper_id: user3.id
    )
    clap19 = Clap.create!(
      amount: 6,
      clappable_type: "Article",
      clappable_id: article8.id,
      clapper_id: user4.id
    )

    # Article 9 Claps
    clap20 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article9.id,
      clapper_id: user4.id
    )

    # Article 11 Claps
    clap21 = Clap.create!(
      amount: 10,
      clappable_type: "Article",
      clappable_id: article11.id,
      clapper_id: user2.id
    )
    clap22 = Clap.create!(
      amount: 8,
      clappable_type: "Article",
      clappable_id: article11.id,
      clapper_id: user7.id
    )
    clap23 = Clap.create!(
      amount: 12,
      clappable_type: "Article",
      clappable_id: article11.id,
      clapper_id: user6.id
    )

    # Article 13 Claps
    clap24 = Clap.create!(
      amount: 7,
      clappable_type: "Article",
      clappable_id: article13.id,
      clapper_id: user4.id
    )
    clap25 = Clap.create!(
      amount: 3,
      clappable_type: "Article",
      clappable_id: article13.id,
      clapper_id: user3.id
    )

    # Article 14 Claps
    clap26 = Clap.create!(
      amount: 6,
      clappable_type: "Article",
      clappable_id: article14.id,
      clapper_id: user8.id
    )

    # Article 15 Claps
    clap27 = Clap.create!(
      amount: 10,
      clappable_type: "Article",
      clappable_id: article15.id,
      clapper_id: user5.id
    )

    # Article 16 Claps
    clap28 = Clap.create!(
      amount: 5,
      clappable_type: "Article",
      clappable_id: article16.id,
      clapper_id: user4.id
    )
    clap29 = Clap.create!(
      amount: 25,
      clappable_type: "Article",
      clappable_id: article16.id,
      clapper_id: user2.id
    )

    # Article 17 Claps
    clap30 = Clap.create!(
      amount: 8,
      clappable_type: "Article",
      clappable_id: article17.id,
      clapper_id: user4.id
    )
    clap31 = Clap.create!(
      amount: 7,
      clappable_type: "Article",
      clappable_id: article17.id,
      clapper_id: user11.id
    )

    # Article 18 Claps
    clap32 = Clap.create!(
      amount: 3,
      clappable_type: "Article",
      clappable_id: article18.id,
      clapper_id: user4.id
    )
    clap33 = Clap.create!(
      amount: 10,
      clappable_type: "Article",
      clappable_id: article18.id,
      clapper_id: user10.id
    )

    # Extra Claps
    clap34 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article1.id,
      clapper_id: user12.id
    )
    clap35 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article3.id,
      clapper_id: user13.id
    )
    clap36 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article10.id,
      clapper_id: user14.id
    )
    clap37 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article2.id,
      clapper_id: user12.id
    )
    clap38 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article7.id,
      clapper_id: user13.id
    )
    clap39 = Clap.create!(
      amount: 1,
      clappable_type: "Article",
      clappable_id: article14.id,
      clapper_id: user14.id
    )

    # Follow Seeds

    # Amin User 2 Following
    follow1 = Follow.create!(
      follower_id: user3.id,
      user_id: user2.id
    )
    follow2 = Follow.create!(
      follower_id: user4.id,
      user_id: user2.id
    )
    follow3 = Follow.create!(
      follower_id: user5.id,
      user_id: user2.id
    )

    # Spencer User 3 Following
    follow4 = Follow.create!(
      follower_id: user4.id,
      user_id: user3.id
    )
    follow5 = Follow.create!(
      follower_id: user5.id,
      user_id: user3.id
    )

    # Kyle User 4 Following
    follow6 = Follow.create!(
      follower_id: user2.id,
      user_id: user4.id
    )
    follow7 = Follow.create!(
      follower_id: user3.id,
      user_id: user4.id
    )
    follow8 = Follow.create!(
      follower_id: user9.id,
      user_id: user4.id
    )

    # Ayce User 5 Following
    follow9 = Follow.create!(
      follower_id: user4.id,
      user_id: user5.id
    )

    # Stephen User 6 Following
    follow10 = Follow.create!(
      follower_id: user5.id, 
      user_id: user6.id
    )

    # Clarence User 7 Following
    follow11 = Follow.create!(
      follower_id: user4.id,
      user_id: user7.id
    )
    follow12 = Follow.create!(
      follower_id: user2.id,
      user_id: user7.id
    )

    # Kin Ka User 8 Following
    follow13 = Follow.create!(
      follower_id: user2.id,
      user_id: user8.id
    )

    # Ash User 9 Following
    follow14 = Follow.create!(
      follower_id: user4.id,
      user_id: user9.id
    )
    follow15 = Follow.create!(
      follower_id: user10.id,
      user_id: user9.id
    )

    # Brendan User 10 Following
    follow16 = Follow.create!(
      follower_id: user4.id,
      user_id: user10.id
    )

    # Joe User 11 Following
    follow17 = Follow.create!(
      follower_id: user10.id,
      user_id: user11.id
    )
    follow18 = Follow.create!(
      follower_id: user4.id,
      user_id: user11.id
    )

    # Extra Follows
    follow19 = Follow.create!(
      follower_id: user12.id,
      user_id: user2.id
    )
    follow20 = Follow.create!(
      follower_id: user13.id,
      user_id: user3.id
    )
    follow21 = Follow.create!(
      follower_id: user14.id,
      user_id: user4.id
    )


    puts "Done!"
  # end