import { ReportType, Playerloop } from '.'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.SECRET || 'token'

describe('Create reports', function () {
    it('should create a simple report with only text', async function () {
        const p = new Playerloop()
        p.init({ secret: SECRET })
        p.identify({ playerId: '12345678' })

        const result = await p.createReport({
            type: ReportType.BUG,
            text: 'test',
            accepted_privacy: true,
        })

        expect(result).toBe(true)
    })
    it('should create a report uploading one attachment', async function () {
        const p = new Playerloop()
        p.init({ secret: SECRET })
        p.identify({ playerId: '12345678' })

        const result = await p.createReport({
            type: ReportType.BUG,
            text: 'testasdsadaa',
            accepted_privacy: true,
            attachments: [path.resolve('./LICENSE.md')],
        })

        expect(result).toBe(true)
    })
    it('should create a report uploading multiple attachments', async function () {
        const p = new Playerloop()
        p.init({ secret: SECRET })
        p.identify({ playerId: '12345678' })

        const result = await p.createReport({
            type: ReportType.BUG,
            text: 'test',
            accepted_privacy: true,
            attachments: [path.resolve('./README.md'), path.resolve('./LICENSE.md')],
        })

        expect(result).toBe(true)
    })
})
