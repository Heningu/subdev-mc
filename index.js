require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, EmbedBuilder, PermissionsBitField } = require('discord.js');

// Instantiate the client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Define the commands
const commands = [
    {
        name: 'embedded-rules',
        description: 'Send embedded rules',
    },
    {
        name: 'embedded-general',
        description: 'Send general information',
    },
    {
        name: 'server-roles',
        description: 'Send server roles information',
    },
    {
        name: 'useful-links',
        description: 'Send useful links',
    },
    {
        name: 'team-embedded',
        description: 'Send team information',
    },
    {
        name: 'faq-embedded',
        description: 'Send FAQ information',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log('Bot is online!');
    client.user.setActivity('sending embeds', { type: 'WATCHING' });
});

// Function to check if the user is an administrator
const isAdmin = (member) => {
    return member.permissions.has(PermissionsBitField.Flags.Administrator);
};

// Define the command handlers
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, member } = interaction;

    // Check if the user is an administrator
    if (!isAdmin(member)) {
        await interaction.reply({ content: 'You do not have permissions to use this command.', ephemeral: true });
        return;
    }

    // Defer the reply to remove the "User used /command" message
    await interaction.deferReply({ ephemeral: true });

    if (commandName === 'embedded-rules') {
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1242821520968126585/1245146688247562352/Rules.png?ex=6657b0b8&is=66565f38&hm=a25d141106c88c662a2ee94575e9c56961bd4fc6e3323f4a7b6642a6312d0d28');
        const embed = new EmbedBuilder()
            .setDescription(`# **General Rules**
1. **Respect All Members**: Treat all members with respect. Harassment, abuse, or offensive behavior will not be tolerated.

2. **No Spamming**: Avoid spamming the chats with repetitive posts, advertisements, or irrelevant content.

3. **No Cheating**: Discussion or promotion of cheating, hacks, exploits, or any unfair advantage is strictly prohibited. This includes sharing links, tools, or methods related to cheating.

4. **No Personal Attacks**: Avoid personal attacks, insults, or inflammatory comments. Debate ideas, not individuals.

5. **Do Not DM Staff**: Do not send direct messages to staff members for support. Use the appropriate forum sections for reporting issues or asking for help.

6. **Confidential Information**: Do not post any personal or confidential information. This forum is public, and such information could be misused.

7. **English Only**: Please use English for all chats and discussions to ensure clear communication.

**[Discord Terms of Service](https://discordapp.com/tos)**
**[Community Guidelines](https://dis.gd/guidelines)**`);

        await interaction.channel.send({ embeds: [embed] });
    } else if (commandName === 'embedded-general') {
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1242821520968126585/1245159089282088960/Welcome.png?ex=6657bc44&is=66566ac4&hm=2080be3b8f5693adf0b790ff5646c48b10232ee85c93cfe1f395b531a6103b26');
        const embed = new EmbedBuilder()
            .setDescription(`**This is the Official Server of the Game SUBDIVERS**

### What is SUBDIVERS?
> *SUBDIVERS is a Free-to-Play First-person Submarine Shooting Game. Inspired by the classic game SteelDivers: Subwars from 2014, we've revamped and recreated it with our unique touch to deliver a whole new experience, rekindling lost and forgotten memories.*

### Premium Upgrade
> *Our games are free, but we offer users the option to purchase a premium upgrade, unlocking more current and future content.*

### Game Modes
> *Currently, in the early stages of development, we offer only the Singleplayer Campaign mode. In the future, we plan to introduce various modes, including a 5 vs 5 Multiplayer mode where each player has one life and teams battle for victory.*`);

        await interaction.channel.send({ embeds: [embed] });
    } else if (commandName === 'server-roles') {
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1242821520968126585/1245146714449383524/Roles.png?ex=6657b0be&is=66565f3e&hm=d07a16d5fe64f26e158b69690ba394eea46f014864007e60cc888a52a776f217');
        const embed = new EmbedBuilder()
            .setDescription(`### **Bot** <:bot:1244696369202200817>: A bot from the Discord Server
### **DEV** <:dev:1244696344850075751>: Dev of the team
### **Designer** <:designer:1244696359400116274>: Designer of the game
### **Moderator** <:mod:1244696335026753599>: Moderates the server and community
### **Community** <:Community:1244695104858624022>: General Member
### **First Captain** <a:vip:1245154204104790076>: One of the first 200 Members`);

        await interaction.channel.send({ embeds: [embed] });
    } else if (commandName === 'useful-links') {
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1242821520968126585/1245146739531448420/links.png?ex=6657b0c4&is=66565f44&hm=4c53f0c4a24aef552c39a9b8af1ff2777cd4dbf73b42d0fac5f80fba6f55e754');
        const embed = new EmbedBuilder()
            .setDescription(`### Follow us on X 🔗 N/A
### Follow us on Reddit 🔗 N/A
### Official Steam Group 🔗 N/A
### Discord Permanent Invite Link 🔗 https://discord.gg/subdivers
### Visit our Website 🔗 N/A`);

        await interaction.channel.send({ embeds: [embed] });
    } else if (commandName === 'team-embedded') {
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1242821520968126585/1245146714449383524/Roles.png?ex=6657b0be&is=66565f3e&hm=d07a16d5fe64f26e158b69690ba394eea46f014864007e60cc888a52a776f217');
        const embed = new EmbedBuilder()
            .setDescription(`## **Head Staff**
- Henning: Developer & Owner <@485193722414235676> <:dev:1244696344850075751>
- Ram: Developer & Owner <@188988455554908160> <:dev:1244696344850075751>

## **Design Team**
- Ira: Designer & Artwork <@1196868993500327956> <:designer:1244696359400116274>
- Kingsgamer: 3D Modelling & Ideas <@552098462649548800> <:designer:1244696359400116274>

## **Support Team**
- Ralix: Lead Moderator <@820597709278412850> <:mod:1244696335026753599>

*If you have any questions or need assistance, please feel free to create a ticket in <#1244658557744447488>. Happy playing!*`);

        await interaction.channel.send({ embeds: [embed] });
    } else if (commandName === 'faq-embedded') {
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1242821520968126585/1245146739531448420/links.png?ex=6657b0c4&is=66565f44&hm=4c53f0c4a24aef552c39a9b8af1ff2777cd4dbf73b42d0fac5f80fba6f55e754');
        const embed = new EmbedBuilder()
            .setDescription(`### Who Are We?
> We are a dedicated team of developers with big dreams, committed to delivering unique experiences through our games and future projects.

### What Projects Are We Currently Working On?
> Our primary focus is our latest project, "SUBDIVERS," a submarine First Person Shooter. Stay tuned for more details soon. We'll embark on new projects once this one is completed and stable.

### When Will "SUBDIVERS" Be Released?
> We cannot provide a specific release date at the moment. However, we will keep you updated with any new information. Release date: TBA.

### How Can I Contribute to the Projects as Part of the Community?
> We value your thoughts and suggestions! Feel free to share your ideas, and they might be incorporated into our projects. Additionally, Discord Server Boosts are always appreciated.

## More Information Coming Soon!

*If you need assistance and cannot find the information in the forums, please create a ticket.*`);

        await interaction.channel.send({ embeds: [embed] });
    }

    // Acknowledge the interaction to prevent "interaction failed" message
    await interaction.editReply({ content: 'Command executed successfully.', ephemeral: true });
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
