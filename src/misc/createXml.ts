export async function createXml(color: any): Promise<string> {
    let xml = '';
    if(color.length > 0) {
        xml += '<colors>';
        await color.forEach((c: any) => {
            xml += `<color>
                        <id>${c.id}</id>
                        <name>${c.name}</name>
                        <color>${c.color}</color>
                        <year>${c.year}</year>
                        <pantone_value>${c.pantone_value}</pantone_value>
                    </color>`;
        });
        xml += '</colors>';
    } else {
        xml += `<color>
                    <id>${color.id}</id>
                    <name>${color.name}</name>
                    <color>${color.color}</color>
                    <year>${color.year}</year>
                    <pantone_value>${color.pantone_value}</pantone_value>
                </color>`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>${xml}`;
}