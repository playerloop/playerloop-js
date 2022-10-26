import fetch, { FormData, File } from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
// @ts-ignore
global.TextDecoder = TextDecoder

const API_URL = 'http://localhost:1234'

export enum ReportType {
    BUG = 'bug',
    FEEDBACK = 'feedback',
}

export class Playerloop {
    secret: string | null = null
    playerId: string | null = null

    init({ secret }: { secret: string }): void {
        this.secret = secret
    }

    identify({ playerId }: { playerId: string }): void {
        this.playerId = playerId
    }

    async uploadAttachment(filepath: string, reportId: string): Promise<void> {
        // create a blob from a local file
        const file = fs.readFileSync(filepath)
        const blob = new File([file], path.basename(filepath))
        const formData = new FormData()
        formData.append('file', blob)
        const response = await fetch(`${API_URL}/reports/${reportId}/attachments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.secret}`,
                Accept: '*/*',
            },
            body: formData,
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}` + JSON.stringify(await response.json()))
        }
    }

    async createReport(options: {
        type: ReportType
        text: string
        accepted_privacy: boolean
        player_id?: string
        attachments?: string[]
    }): Promise<boolean> {
        const { type, text, accepted_privacy, player_id, attachments } = options
        let id = player_id
        if (!player_id && !this.playerId) {
            throw new Error('Player ID is required')
        }
        if (!player_id && this.playerId) {
            id = this.playerId
            const response = await fetch(`${API_URL}/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.secret}`,
                },
                body: JSON.stringify({
                    type,
                    text,
                    accepted_privacy,
                    player: {
                        id,
                    },
                    client: 'javascript',
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to create report')
            }
            if (attachments) {
                const responseJson = (await response.json()) as { data: { id: string } }
                const reportId = responseJson.data.id
                let uploadedCount = 0
                for (const attachment of attachments) {
                    try {
                        await this.uploadAttachment(attachment, reportId)
                    } catch (error) {
                        throw error
                    }
                    uploadedCount++
                    if (uploadedCount === attachments.length) {
                        return true
                    }
                }
                if (uploadedCount < attachments.length) {
                    return false
                }
            }
            return true
        }
        return false
    }
}
