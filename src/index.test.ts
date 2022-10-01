import { ReportType, Playerloop } from '.'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

describe('Create reports', function () {
    it('should create a simple report with only text', async function () {
        const p = new Playerloop()
        p.init(process.env.SECRET || 'token')
        p.identify('12345678')
        try {
            await p.createReport({
                type: ReportType.BUG,
                text: 'test',
                accepted_privacy: true,
            })
        } catch (e) {
            throw e
        }
    })
    it('should create a report uploading one attachment', function () {
        const p = new Playerloop()
        p.init(process.env.SECRET || 'token')
        p.identify('12345678')
        try {
            p.createReport({
                type: ReportType.BUG,
                text: 'testasdsadaa',
                accepted_privacy: true,
                attachments: [path.resolve('./LICENSE.md')],
            })
        } catch (e) {
            throw e
        }
    })
    it('should create a report uploading multiple attachments', function () {
        const p = new Playerloop()
        p.init(process.env.SECRET || 'token')
        p.identify('12345678')
        try {
            p.createReport({
                type: ReportType.BUG,
                text: 'test',
                accepted_privacy: true,
                attachments: [path.resolve('./README.md'), path.resolve('./LICENSE.md')],
            })
        } catch (e) {
            throw e
        }
    })
})
