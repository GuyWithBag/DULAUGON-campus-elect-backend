import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const PRESIDENT25_ID = "election-2025-president"

async function seedElections() {
    const election25 = await prisma.election.upsert({
        where: { id: "election-2025"},
        update: {},
        create: {
            id: 'election-2025',
            name: 'Election 2025', 
            startDate: new Date('2025-05-26T00:00:00Z'), 
            endDate: new Date("2025-06-26T23:59:59Z"),
            description: "University Student Council Elections 2025",
            isActive: true, 
        }
    })

    await prisma.position.upsert({
        where: {id: PRESIDENT25_ID}, 
        update: {}, 
        create: {
            id: PRESIDENT25_ID,
            title: "President", 
            Election: {
                connect: {
                    id: election25.id
                }
            }
        }
    })
}

async function main() {
    console.log("SEEDING DATABASE...") 

    await seedElections()

    // Create Students
    await prisma.student.createMany({
        data: [
            { studentId: 'S001', email: 'alice@example.com', name: 'Alice', department: 'Engineering' },
            { studentId: 'S002', email: 'bob@example.com', name: 'Bob', department: 'Science' },
            { studentId: 'S003', email: 'carol@example.com', name: 'Carol', department: 'Arts' },
        ],
        skipDuplicates: true,
    });

    // Create Election
    const election = await prisma.election.create({
        data: {
            name: '2025 Student Council Election',
            description: 'Annual election for student council positions.',
            startDate: new Date('2025-06-20T08:00:00Z'),
            endDate: new Date('2025-06-25T17:00:00Z'),
            isActive: true,
            notes: 'Vote wisely!',
        },
    });

    // Create Positions
    const president = await prisma.position.create({
        data: {
            title: 'President',
            electionId: election.id,
        },
    });
    const secretary = await prisma.position.create({
        data: {
            title: 'Secretary',
            electionId: election.id,
        },
    });

    // Create Candidates
    await prisma.candidate.create({
        data: {
            positionId: president.id,
            studentId: 'S001',
        },
    });
    await prisma.candidate.create({
        data: {
            positionId: president.id,
            studentId: 'S002',
        },
    });
    await prisma.candidate.create({
        data: {
            positionId: secretary.id,
            studentId: 'S003',
        },
    });

    // Create Votes
    await prisma.vote.createMany({
        data: [
            {
                voterId: 'S003',
                positionId: president.id,
                electionId: election.id,
            },
            {
                voterId: 'S001',
                positionId: secretary.id,
                electionId: election.id,
            },
        ],
        skipDuplicates: true,
    });

    console.log("FINISHED SEEDING")
}

void main()